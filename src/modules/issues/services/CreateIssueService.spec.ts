import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeIssuesRepository from '../repositories/fakes/FakeIssuesRepository';
import CreateIssueService from './CreateIssueService';

let fakeIssuesRepository: FakeIssuesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createIssue: CreateIssueService;

describe('CreateIssue', () => {
 beforeEach(() => {
  fakeIssuesRepository = new FakeIssuesRepository();
  createIssue = new CreateIssueService(fakeIssuesRepository, fakeStorageProvider);
 });

 it('should be able to create a new issue', async () => {
  const issue = await createIssue.execute({
   title: 'test',
   description: '123',
   isSpecial: 0,
  });

  expect(issue).toHaveProperty('id');
  expect(issue.title).toBe('test');
  expect(issue.description).toBe('123');
 });

 it('should be able to automatically assign numbers/titles', async () => {
  const issue1 = await createIssue.execute({
   isSpecial: 0,
  });
  const issue2 = await createIssue.execute({
   isSpecial: 0,
  });
  const issue3 = await createIssue.execute({
   isSpecial: 0,
  });

  expect(issue1.title).toBe('Janeiro-Abril');
  expect(issue1.number).toBe(1);
  expect(issue2.title).toBe('Maio-Agosto');
  expect(issue2.number).toBe(2);
  expect(issue3.title).toBe('Setembro-Dezembro');
  expect(issue3.number).toBe(3);
 });

 it('should not give a number if issue is special', async () => {
  const issue = await createIssue.execute({
   isSpecial: 1,
  });

  expect(issue.number).toBe(undefined);
 });
});
