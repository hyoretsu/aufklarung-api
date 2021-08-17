import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ToggleAdminService from './ToggleAdminService';

let fakeUsersRepository: FakeUsersRepository;
let toggleAdminService: ToggleAdminService;

describe('ToggleAdmin', () => {
 beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  toggleAdminService = new ToggleAdminService(fakeUsersRepository);
 });

 it('should be able to turn an user into an admin', async () => {
  const user = await fakeUsersRepository.create({
   email: 'test@email.com',
   first_name: 'Jane',
   last_name: 'Doe',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  await toggleAdminService.execute(user.id);

  expect(user).toHaveProperty('is_admin', true);
 });

 it('should be able to remove admin status from an user', async () => {
  const user = await fakeUsersRepository.create({
   email: 'test@email.com',
   first_name: 'Jane',
   last_name: 'Doe',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  user.is_admin = true;

  await toggleAdminService.execute(user.id);

  expect(user).toHaveProperty('is_admin', false);
 });

 it('should not be able to turn a non-existing user into an admin', async () => {
  await expect(toggleAdminService.execute('testId')).rejects.toBeInstanceOf(AppError);
 });
});
