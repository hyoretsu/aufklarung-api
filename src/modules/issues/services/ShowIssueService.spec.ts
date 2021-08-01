import FakeIssuesRepository from '../repositories/fakes/FakeIssuesRepository';
import ShowIssueService from './ShowIssueService';

let fakeIssuesRepository: FakeIssuesRepository;
let showIssue: ShowIssueService;

describe('ShowIssue', () => {
 beforeEach(() => {
  fakeIssuesRepository = new FakeIssuesRepository();
  showIssue = new ShowIssueService(fakeIssuesRepository);
 });

 it('should be able to show an existing issue', async () => {
  const newIssue = await fakeIssuesRepository.create({
   title: 'test',
   isSpecial: false,
   volume: 1,
  });

  const foundIssue = await showIssue.execute(newIssue.id);

  expect(foundIssue).toStrictEqual(foundIssue);
 });

 it('should not be able to show a non-existing issue', async () => {
  const foundIssue = await showIssue.execute('testId');

  expect(foundIssue).toBeUndefined();
 });
});
