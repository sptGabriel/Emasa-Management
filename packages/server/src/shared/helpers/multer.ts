import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';

const LocalStorage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', '..', 'uploads'),
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const { id } = req.params;
    const fileName = `${id}_${Date.now()}_${file.originalname}`;
    callback(null, fileName);
  },
});

export default {
  dest: path.resolve(__dirname, '..', '..', '..', 'uploads'),
  storage: LocalStorage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
