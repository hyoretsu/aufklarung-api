import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
 private ormRepository: Repository<User>;

 constructor() {
  this.ormRepository = getRepository(User);
 }

 public async create(data: ICreateUserDTO): Promise<User> {
  const user = this.ormRepository.create(data);

  await this.ormRepository.save(user);

  return user;
 }

 public async findByEmail(email: string): Promise<User | undefined> {
  const user = await this.ormRepository.findOne(email);

  return user;
 }

 public async findByOrcid(orcid: number): Promise<User | undefined> {
  const user = await this.ormRepository.findOne(orcid);

  return user;
 }
}
