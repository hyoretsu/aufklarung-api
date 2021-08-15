import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface ILoginDTO {
 email: string;
 password: string;
}

interface ISessionInfo {
 email: string;
 user_id: string;
}

@injectable()
export default class AuthenticateUserService {
 constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,

  @inject('HashProvider')
  private hashProvider: IHashProvider,
 ) {}

 public async execute({ email, password }: ILoginDTO): Promise<ISessionInfo> {
  // Check if an user with that email exists
  const user = await this.usersRepository.findByEmail(email);
  if (!user) {
   throw new AppError('Um usuário com este email não existe. Tente novamente', 404);
  }

  // Check if the password sent matches the stored one
  const isPasswordCorrect = await this.hashProvider.compare(password, user.password);
  if (isPasswordCorrect === false) {
   throw new AppError('Senha incorreta. Tente novamente', 401);
  }

  return {
   email: user.email,
   user_id: user.id,
  };
 }
}
