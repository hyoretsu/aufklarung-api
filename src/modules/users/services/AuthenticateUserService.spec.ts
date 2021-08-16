import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
 beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  fakeHashProvider = new FakeHashProvider();
  authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
 });

 it('should be able to authenticate an user', async () => {
  const user = await fakeUsersRepository.create({
   email: 'test@email.com',
   first_name: 'Jane',
   last_name: 'Doe',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  const userInfo = await authenticateUser.execute({
   email: user.email,
   password: user.password,
  });

  expect(userInfo).toHaveProperty('email', user.email);
  expect(userInfo).toHaveProperty('user_id', user.id);
  expect(userInfo).toHaveProperty('is_admin', false);
 });

 it('should not be able to authenticate a non-existing user', async () => {
  await expect(
   authenticateUser.execute({
    email: 'test@email.com',
    password: '123123',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });

 it('should not be able to authenticate an user with wrong password', async () => {
  const user = await fakeUsersRepository.create({
   email: 'test@email.com',
   first_name: 'Jane',
   last_name: 'Doe',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  await expect(
   authenticateUser.execute({
    email: user.email,
    password: '123456',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });
});
