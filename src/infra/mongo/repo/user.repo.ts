import mongoose from 'mongoose';
import { IUserDal } from '../../../services/interfaces/dal/userDal.interface';

import User from '../../../types/user.type';
import { BaseRepository } from './baseRepository';

export class UserRepo extends BaseRepository<User> implements IUserDal {
    constructor(conn: mongoose.Connection, collectionName: string, schema: mongoose.Schema) {
        super(conn, collectionName, schema);
    }

    public getById = async (userId: string): Promise<User | null> => {
        const user: User = await this._model.findById(userId, { password: 0 }).lean();

        return user;
    };

    public create = async (user: User): Promise<User> => {
        const newUser = await this._model.create(user);
        return newUser.toObject();
    };

    public updateName = async (userId: string, name: string): Promise<User | null> => {
        const user = await this._model.findByIdAndUpdate(userId, { name }, { new: true }).lean();

        return user;
    };

    public delete = async (userId: string): Promise<User | null> => {
        const user = await this._model.findByIdAndDelete({ _id: userId }).lean();

        return user;
    };

    public get = async (userId: string): Promise<User | null> => {
        const user = await this._model.findById(userId, { password: 0 }).lean();

        return user;
    };

    public getByNameAndPassword = async (name: string, password: string): Promise<User | null> => {
        const user = await this._model.findOne({ name, password }, { password: 0 }).lean();

        return user;
    };
}
