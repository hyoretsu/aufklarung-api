import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
 public async saveFile(file: string): Promise<string> {
  const filePath = path.resolve(uploadConfig.uploadsFolder, file);

  const fileExists = await fs.promises.stat(filePath);
  if (!fileExists) {
   await fs.promises.rename(path.resolve(uploadConfig.tmpFolder, file), path.resolve(uploadConfig.uploadsFolder, file));
  }

  return file;
 }

 public async deleteFile(file: string): Promise<void> {
  const filePath = path.resolve(uploadConfig.uploadsFolder, file);

  const fileExists = await fs.promises.stat(filePath);
  if (fileExists) {
   await fs.promises.unlink(filePath);
  }
 }
}
