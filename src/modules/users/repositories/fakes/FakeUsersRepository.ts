import { v4 as uuidv4 } from 'uuid';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
 private users: User[] = [];

 public async create(userInfo: ICreateUserDTO): Promise<User> {
  const user = new User();
  const date = new Date();

  // Create user object
  Object.assign(
   user,
   {
    id: uuidv4(),
    created_at: date,
    updated_at: date,
   },
   userInfo,
  );
  this.users.push(user);

  return user;
 }

 public async findAll(): Promise<User[]> {
  return this.users;
 }

 public async findByEmail(email: string): Promise<User | undefined> {
  const foundUser = this.users.find(user => user.email === email);

  return foundUser;
 }

 public async findById(id: string): Promise<User | undefined> {
  const foundUser = this.users.find(user => user.id === id);

  return foundUser;
 }

 public async findByOrcid(orcid: number): Promise<User | undefined> {
  const foundUser = this.users.find(user => user.orcid === orcid);

  return foundUser;
 }
}
