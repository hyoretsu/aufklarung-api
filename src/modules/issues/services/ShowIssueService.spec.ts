import AppError from '@shared/errors/AppError';

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
  const issue = await fakeIssuesRepository.create({
   title: 'test',
   isSpecial: false,
   volume: 1,
  });

  const foundIssue = await showIssue.execute(issue.id);

  expect(foundIssue).toStrictEqual(issue);
 });

 it('should not be able to show a non-existing issue', async () => {
  await expect(showIssue.execute('testId')).rejects.toBeInstanceOf(AppError);
 });
});
