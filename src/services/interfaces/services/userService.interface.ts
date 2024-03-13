import { LoginUser } from '../../../types/loginUser.type';
import User from '../../../types/user.type';

export interface IUserService {
    createUser(user: User): Promise<User>;
    createGoogleUser(user: User): Promise<User>;
    updateUser(userId: string, name: string): Promise<User | null>;
    deleteUser(userId: string): Promise<User | null>;
    getUserById(userId: string): Promise<User | null>;
    getAllUsers(): Promise<User[] | null>;
    getUserByNameAndPassword(name: string, password: string): Promise<User | null>;
    login(name: string, password: string): Promise<LoginUser | null>;
    auth(token: string): Promise<string | null>;
    logout(token: string): Promise<void>;
    refresh(token: string): Promise<string>;
}
