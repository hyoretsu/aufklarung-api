import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ListUsersService {
 constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,
 ) {}

 public async execute(): Promise<User[]> {
  const users = this.usersRepository.findAll();

  return users;
 }
}
