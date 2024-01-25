// get photo by express and save it to the server save the path to the db using multer

import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';

const mul = multer({
    storage: multer.diskStorage({
        destination: function (_req, _file, cb) {
            cb(null, './uploads/photos');
        },
        filename: function (_req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

const upload = mul.single('image');

export const uploadPhoto = async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, function (err) {
        try {
            if (err instanceof multer.MulterError) {
                return res.status(400).send({ message: err.message });
            } else if (err) {
                return res.status(400).send({ message: err.message });
            }

            req.body.photo = req.file!.path;
            req.body.photoName = req.file!.originalname;
            return next();
        } catch (error: any) {
            return res.status(400).send({ message: error?.message ?? error });
        }
    });
};
