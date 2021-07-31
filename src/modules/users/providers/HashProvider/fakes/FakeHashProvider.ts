import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
 public async generate(password: string): Promise<string> {
  return password;
 }

 public async compare(password: string, hashedPassword: string): Promise<boolean> {
  return password === hashedPassword;
 }
}
