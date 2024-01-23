import { BaseRepository } from './baseRepository';
import { ITokenDal } from '../../../services/interfaces/dal/tokenDal.interface';
import mongoose from 'mongoose';
import Token from '../../../types/token.type';

export class TokensRepo extends BaseRepository<Token> implements ITokenDal {
    constructor(conn: mongoose.Connection, collectionName: string, schema: mongoose.Schema) {
        super(conn, collectionName, schema);
    }

    saveToken = async (token: string): Promise<void> => {
        const newToken = new this._model({ token });
        await newToken.save();
    };

    getToken = async (token: string): Promise<Token | null> => {
        const foundedToken = await this._model.findOne({ token }).lean();

        return foundedToken;
    };

    deleteToken = async (token: string): Promise<void> => {
        await this._model.deleteOne({ token });
    };
}
