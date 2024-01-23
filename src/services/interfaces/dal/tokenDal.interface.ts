import Token from '../../../types/token.type';

export interface ITokenDal {
    saveToken(token: string): Promise<void>;
    getToken(token: string): Promise<Token | null>;
    deleteToken(token: string): Promise<void>;
}
