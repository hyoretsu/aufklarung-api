import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ShowUserService {
 constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,
 ) {}

 public async execute(id: string): Promise<User | undefined> {
  const user = await this.usersRepository.findById(id);

  return user;
 }
}
