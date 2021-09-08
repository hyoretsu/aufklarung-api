import FakeIssuesRepository from '../repositories/fakes/FakeIssuesRepository';
import ListIssuesService from './ListIssuesService';

let fakeIssuesRepository: FakeIssuesRepository;
let listIssues: ListIssuesService;

describe('ListIssues', () => {
 beforeEach(() => {
  fakeIssuesRepository = new FakeIssuesRepository();
  listIssues = new ListIssuesService(fakeIssuesRepository);
 });

 it('should be able to list existing issues', async () => {
  const issue1 = await fakeIssuesRepository.create({
   title: 'test1',
   is_special: false,
   volume: 1,
  });
  const issue2 = await fakeIssuesRepository.create({
   title: 'test2',
   is_special: false,
   volume: 1,
  });

  const issues = await listIssues.execute();

  expect(issues).toStrictEqual([issue1, issue2]);
 });
});
