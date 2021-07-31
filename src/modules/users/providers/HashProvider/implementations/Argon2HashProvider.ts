import { hash, verify } from 'argon2';

import IHashProvider from '../models/IHashProvider';

export default class Argon2HashProvider implements IHashProvider {
 public async generate(password: string): Promise<string> {
  const hashedPassword = await hash(password);

  return hashedPassword;
 }

 public async compare(password: string, hashedPassword: string): Promise<boolean> {
  return verify(hashedPassword, password);
 }
}
