import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
 private storage: string[] = [];

 public async saveFile(file: string): Promise<string> {
  const fileExists = this.storage.find(storedFile => storedFile === file);

  if (!fileExists) {
   this.storage.push(file);
  }

  return file;
 }

 public async deleteFile(file: string): Promise<void> {
  const fileExists = this.storage.find(storedFile => storedFile === file);

  if (fileExists) {
   this.storage = this.storage.filter(storedFile => storedFile !== file);
  }
 }
}
