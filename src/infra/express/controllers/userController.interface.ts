import { Request, Response } from 'express';

export interface IUserController {
    login(req: Request, res: Response): Promise<void>;
    createUser(req: Request, res: Response): Promise<void>;
    createGoogleUser(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    getAllUsers(req: Request, res: Response): Promise<void>;
    getUserByNameAndPassword(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    image(req: Request, res: Response): Promise<void>;
}
