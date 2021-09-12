/* eslint-disable require-await */
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
 private users: User[] = [];

 public async create(userInfo: ICreateUserDTO): Promise<User> {
  const user = new User();

  Object.assign(user, userInfo);
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

 public async save(updatedUser: User): Promise<User | undefined> {
  const foundIndex = this.users.findIndex(user => user.id === updatedUser.id);

  this.users[foundIndex] = updatedUser;

  return updatedUser;
 }
}
