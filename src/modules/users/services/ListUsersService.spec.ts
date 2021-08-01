import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
 beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  listUsers = new ListUsersService(fakeUsersRepository);
 });

 it('should be able to list all users', async () => {
  const user1 = await fakeUsersRepository.create({
   first_name: 'John',
   last_name: 'Doe',
   email: 'test@email.com',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  const user2 = await fakeUsersRepository.create({
   first_name: 'Jane',
   last_name: 'Doe',
   email: 'test@email.com',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  const users = await listUsers.execute();

  expect(users).toStrictEqual([user1, user2]);
 });
});
