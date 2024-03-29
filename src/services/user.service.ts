import { verify } from 'jsonwebtoken';
import { generateRefreshToken, generateToken } from '../auth/token';
import config from '../config/config';
import { IUserDal } from './interfaces/dal/userDal.interface';
import { IUserService } from './interfaces/services/userService.interface';
import { ILogger } from '../log/logger';
import User from '../types/user.type';
import { decrypt, encrypt } from '../utils/encrypt';
import { NoTokenError, NotFoundError } from '../infra/express/utils/error';
import { ITokenDal } from './interfaces/dal/tokenDal.interface';
import { IPhotoDal } from './interfaces/dal/photoDal.interface';
import { ICommentDal } from './interfaces/dal/commentDal.interface';

export class UserService implements IUserService {
    private UserRepo: IUserDal;
    private Token: ITokenDal;
    private _logger: ILogger;
    private PhotoRepo: IPhotoDal;
    private CommentRepo: ICommentDal;

    constructor(userRepo: IUserDal, logger: ILogger, token: ITokenDal, photoRepo: IPhotoDal, commentRepo: ICommentDal) {
        this.Token = token;
        this.UserRepo = userRepo;
        this._logger = logger;
        this.PhotoRepo = photoRepo;
        this.CommentRepo = commentRepo;
    }

    auth = async (token: string) => {
        const payload: any = verify(token, config.keys.tokenKey);

        if (!payload || !payload.userIdEnc) return null;

        const userId = decrypt(payload.userIdEnc);

        const user = await this.getUserById(userId);

        if (!user) return null;

        return userId;
    };

    createUser = async (user: User) => {
        const newUser = await this.UserRepo.create({
            name: user.name,
            password: encrypt(user.password!),
            ...(user.imagePath ? { imagePath: user.imagePath } : {}),
            ...(user.imageUrl ? { imageUrl: user.imageUrl } : {}),
        });

        this._logger.logInfo({ message: 'User created successfully' });

        return newUser;
    };

    createGoogleUser = async (user: User) => {
        const newUser = await this.UserRepo.create({
            name: user.name,
            password: encrypt(user.password!),
            fullPath: user.fullPath,
        });

        this._logger.logInfo({ message: 'User created successfully' });

        return newUser;
    };

    updateUser = async (userId: string, name: string) => {
        const user = await this.UserRepo.updateName(userId, name);
        return user;
    };

    deleteUser = async (userId: string) => {
        await this.PhotoRepo.deleteUsersPhotos(userId);
        await this.CommentRepo.deleteCoomentsByUserID(userId);
        const user = await this.UserRepo.delete(userId);
        return user;
    };

    getUserById = async (userId: string) => {
        const user = await this.UserRepo.getById(userId);
        return user;
    };

    getAllUsers = async () => {
        const users = await this.UserRepo.getAll();
        return users;
    };

    getUserByNameAndPassword = async (name: string, password: string) => {
        const user = await this.UserRepo.getByNameAndPassword(name, encrypt(password));
        return user;
    };

    login = async (name: string, password: string) => {
        const user = await this.getUserByNameAndPassword(name, password);

        if (!user) return null;

        const token = generateToken(user._id!.toString());
        const refreshToken = generateRefreshToken(user._id!.toString());

        await this.Token.saveToken(refreshToken);

        return { user, token, refreshToken };
    };

    logout = async (token: string) => {
        const payload: any = verify(token, config.keys.tokenKey);

        if (!payload || !payload.userIdEnc) {
            throw new NoTokenError('Token not found');
        }

        await this.Token.deleteToken(token);
    };

    refresh = async (token: string) => {
        const payload: any = verify(token, config.keys.tokenKey);

        if (!payload || !payload.userIdEnc) {
            throw new NoTokenError('Token not found');
        }

        const tokenFound = await this.Token.getToken(token);

        if (!tokenFound) throw new NotFoundError('Token not found');

        const userId = decrypt(payload.userIdEnc);

        const user = await this.getUserById(userId);

        if (!user) throw new NotFoundError('User not found');

        const newToken = generateToken(user._id!.toString());

        return newToken;
    };
}
