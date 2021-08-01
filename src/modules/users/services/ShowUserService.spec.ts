import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserService from './ShowUserService';

let fakeUsersRepository: FakeUsersRepository;
let showUser: ShowUserService;

describe('ShowUser', () => {
 beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  showUser = new ShowUserService(fakeUsersRepository);
 });

 it('should be able to find an user', async () => {
  const user = await fakeUsersRepository.create({
   first_name: 'Jane',
   last_name: 'Doe',
   email: 'test@email.com',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  const foundUser = await showUser.execute(user.id);

  expect(foundUser).toStrictEqual(user);
 });

 it('should not be able to find a non-existing user', async () => {
  const foundUser = await showUser.execute('testId');

  expect(foundUser).toBeUndefined();
 });
});
