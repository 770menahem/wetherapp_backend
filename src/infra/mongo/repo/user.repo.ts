import mongoose from 'mongoose';
import { IUserDal } from '../../../services/interfaces/dal/userDal.interface';

import User from '../../../types/user.type';
import { BaseRepository } from './baseRepository';

export class UserRepo extends BaseRepository<User> implements IUserDal {
    constructor(conn: mongoose.Connection, collectionName: string, schema: mongoose.Schema) {
        super(conn, collectionName, schema);
    }

    private convertToUser = (user: User | null): User | null => {
        if (!user) return null;
        return {
            ...user,
            ...(user.imagePath && { imagePath: `/user/image/${user.imagePath}` }),
        };
    };

    public getById = async (userId: string): Promise<User | null> => {
        const user: User = await this._model.findById(userId, { password: 0 }).lean();

        return this.convertToUser(user);
    };

    public create = async (user: User): Promise<User> => {
        const newUser = await this._model.create(user);
        return this.convertToUser(newUser)!;
    };

    public updateName = async (userId: string, name: string): Promise<User | null> => {
        const user = await this._model.findByIdAndUpdate(userId, { name }, { new: true });

        return this.convertToUser(user);
    };

    public delete = async (userId: string): Promise<User | null> => {
        const user = await this._model.findByIdAndDelete({ _id: userId });

        return this.convertToUser(user);
    };

    public get = async (userId: string): Promise<User | null> => {
        const user = await this._model.findById(userId, { password: 0 });

        return this.convertToUser(user);
    };

    public getByNameAndPassword = async (name: string, password: string): Promise<User | null> => {
        const user = await this._model.findOne({ name, password }, { password: 0 });

        return this.convertToUser(user);
    };
}
