import { format } from 'date-fns';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
interface IUploadConfig {
 driver: 'disk';

 tmpFolder: string;
 uploadsFolder: string;

 multer: {
  storage: StorageEngine;
 };
}

export default {
 driver: process.env.STORAGE_DRIVER,

 tmpFolder,
 uploadsFolder: path.resolve(tmpFolder, 'uploads'),

 multer: {
  storage: multer.diskStorage({
   destination: tmpFolder,
   filename(req, file, cb) {
    const date = format(new Date(), 'yyyyMMdd-HHmm');
    const filename = `${date}-${file.originalname}`;

    return cb(null, filename);
   },
  }),
 },
} as IUploadConfig;
