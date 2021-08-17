import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ToggleAdminService {
 constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,
 ) {}

 public async execute(id: string): Promise<User | undefined> {
  const user = await this.usersRepository.findById(id);

  if (!user) {
   throw new AppError('Este usuário não existe. Tente novamente', 404);
  }

  user.is_admin = !user.is_admin;

  return this.usersRepository.save(user);
 }
}
