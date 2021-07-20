import FakeIssuesRepository from '../repositories/fakes/FakeIssuesRepository';
import ShowIssueService from './ShowIssueService';

let fakeIssuesRepository: FakeIssuesRepository;
let showIssue: ShowIssueService;

describe('ShowIssue', () => {
 beforeEach(() => {
  fakeIssuesRepository = new FakeIssuesRepository();
  showIssue = new ShowIssueService(fakeIssuesRepository);
 });

 it('should be able to successfully show an existing issue', async () => {
  const newIssue = await fakeIssuesRepository.create({
   title: 'test',
   description: '123',
   isSpecial: false,
   volume: 1,
  });

  const issue = showIssue.execute(newIssue.id);

  expect(issue).toBeTruthy();
 });
});
