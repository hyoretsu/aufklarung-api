import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
 beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  fakeHashProvider = new FakeHashProvider();
  createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
 });

 it('should be able to create an user', async () => {
  const user = await createUser.execute({
   email: 'test@email.com',
   first_name: 'John',
   last_name: 'Doe',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  expect(user).toHaveProperty('id');
 });

 it('should not be able to create an user with an email that has already been used', async () => {
  await createUser.execute({
   email: 'test@email.com',
   first_name: 'John',
   last_name: 'Doe',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  await expect(
   createUser.execute({
    email: 'test@email.com',
    first_name: 'Jane',
    last_name: 'Doe',
    password: '123123',
    university: 'UDCG',
    country: 'Brasil',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });

 it('should not be able to create an user with an ORCID that has already been used', async () => {
  await createUser.execute({
   email: 'test@email.com',
   first_name: 'John',
   last_name: 'Doe',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
   orcid: 1234123412341234,
  });

  await expect(
   createUser.execute({
    email: 'test2@email.com',
    first_name: 'Jane',
    last_name: 'Doe',
    password: '123123',
    university: 'UDCG',
    country: 'Brasil',
    orcid: 1234123412341234,
   }),
  ).rejects.toBeInstanceOf(AppError);
 });
});
