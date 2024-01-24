import { ITokenDal } from '../../src/services/interfaces/dal/tokenDal.interface';
import Token from '../../src/types/token.type';

export class TokenRepoMock implements ITokenDal {
    private tokens: Token[] = [];

    public saveToken = async (token: string): Promise<void> => {
        this.tokens.push({
            token,
        });
    };

    public getToken = async (token: string): Promise<Token | null> => {
        return this.tokens.find((t) => t.token === token) || null;
    };

    public deleteToken = async (token: string): Promise<void> => {
        this.tokens = this.tokens.filter((t) => t.token !== token);
    };
}
