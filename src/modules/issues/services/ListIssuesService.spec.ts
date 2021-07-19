import FakeIssuesRepository from '../repositories/fakes/FakeIssuesRepository';
import ListIssuesService from './ListIssuesService';

let fakeIssuesRepository: FakeIssuesRepository;
let listIssues: ListIssuesService;

describe('ListIssues', () => {
 beforeEach(() => {
  fakeIssuesRepository = new FakeIssuesRepository();
  listIssues = new ListIssuesService(fakeIssuesRepository);
 });

 it('should successfully list existing issues', async () => {
  const issue1 = await fakeIssuesRepository.create({
   title: 'test1',
   description: '123',
   isSpecial: false,
   volume: 1,
  });
  const issue2 = await fakeIssuesRepository.create({
   title: 'test2',
   description: '123',
   isSpecial: false,
   volume: 1,
  });

  const issues = await listIssues.execute();

  expect(issues).toStrictEqual([issue1, issue2]);
 });
});
