import { Request, Response } from 'express';
import { IUserService } from '../../../services/interfaces/services/userService.interface';
import { LoginUser } from '../../../types/loginUser.type';
import User from '../../../types/user.type';
import { NotFoundError, ServiceError } from '../utils/error';
import { IUserController } from './userController.interface';

export class UserController implements IUserController {
    private UserService: IUserService;

    constructor(UserService: IUserService) {
        console.log('UserController created');
        this.UserService = UserService;
    }

    login = async (req: Request, res: Response) => {
        const name = req.body.name;
        const password = req.body.password;
        const user: LoginUser | null = await this.UserService.login(name, password);

        if (!user) throw new ServiceError(404, 'fail to login');
        else res.send(user);
    };

    createUser = async (req: Request, res: Response) => {
        const pathWithNoBackslash = req.body.photo.replace(/\\\//g, '/');
        const user: User | null = await this.UserService.createUser({
            name: req.body.name,
            password: req.body.password,
            imagePath: 'users/image/' + pathWithNoBackslash,
        });

        if (!user) throw new ServiceError(404, 'fail to create user');

        res.status(201).send(user);
    };

    image = async (req: Request, res: Response) => {
        const path = req.params.path;

        res.download(`./uploads/photos/${path}`);
    };

    updateUser = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const name = req.body.name;

        const user: User | null = await this.UserService.updateUser(userId, name);
        if (!user) throw new ServiceError(404, 'fail to update user');
        else res.send(user);
    };

    deleteUser = async (req: Request, res: Response) => {
        const userId = req.params.userId;

        const user: User | null = await this.UserService.deleteUser(userId);
        if (!user) throw new ServiceError(404, 'fail to delete user');
        else res.send({ msg: 'User deleted', user });
    };

    getUserById = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const user: User | null = await this.UserService.getUserById(userId);
        if (!user) throw new ServiceError(404, 'User not found');
        else res.send(user);
    };

    getAllUsers = async (_req: Request, res: Response) => {
        const users: User[] | null = await this.UserService.getAllUsers();

        res.send(users);
    };

    getUserByNameAndPassword = async (req: Request, res: Response) => {
        const name = req.params.name;
        const password = req.params.password;
        const user: User | null = await this.UserService.getUserByNameAndPassword(name, password);
        if (!user) throw new ServiceError(404, 'User not found');
        else res.send(user);
    };

    logout = async (req: Request, res: Response) => {
        const refreshToken = req.headers['refreshtoken'] as string;
        await this.UserService.logout(refreshToken);
        res.send({ msg: 'User logged out' });
    };

    refresh = async (req: Request, res: Response) => {
        const refreshToken = req.headers['refreshtoken'] as string;

        const newToken: string | null = await this.UserService.refresh(refreshToken);

        if (!newToken) throw new NotFoundError('fail to refresh');
        else res.send({ token: newToken });
    };
}
