import { getYear } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import Issue from '@modules/issues/infra/typeorm/entities/Issue';

import ICreateIssueDTO from '../../dtos/ICreateIssueDTO';
import IIssuesRepository from '../IIssuesRepository';

export default class FakeIssuesRepository implements IIssuesRepository {
 private issues: Issue[] = [];

 public async create(issueData: ICreateIssueDTO): Promise<Issue> {
  const issue = new Issue();
  const date = new Date();

  // Create issue object
  Object.assign(
   issue,
   {
    id: uuidv4(),
    created_at: date,
    updated_at: date,
   },
   issueData,
  );
  this.issues.push(issue);

  return issue;
 }

 public async findAll(): Promise<Issue[]> {
  return this.issues;
 }

 public async findById(id: string): Promise<Issue | undefined> {
  const foundIssue = this.issues.find(issue => issue.id === id);

  return foundIssue;
 }

 public async findByYear(year: number): Promise<Issue[]> {
  const foundIssues = this.issues.filter(issue => getYear(issue.created_at) === year);

  return foundIssues;
 }
}
