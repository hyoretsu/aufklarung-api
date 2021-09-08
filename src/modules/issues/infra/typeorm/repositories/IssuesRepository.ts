import { Between, getRepository, Repository } from 'typeorm';

import ICreateIssueDTO from '@modules/issues/dtos/ICreateIssueDTO';
import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';

import Issue from '../entities/Issue';

export default class IssuesRepository implements IIssuesRepository {
 private ormRepository: Repository<Issue>;

 constructor() {
  this.ormRepository = getRepository(Issue);
 }

 public async create(data: ICreateIssueDTO): Promise<Issue> {
  const issue = this.ormRepository.create(data);

  await this.ormRepository.save(issue);

  return issue;
 }

 public async findAll(): Promise<Issue[]> {
  const issues = await this.ormRepository.find();

  return issues;
 }

 public async findById(id: string): Promise<Issue | undefined> {
  const issue = await this.ormRepository.findOne({ id });

  return issue;
 }

 public async findByYear(year: number): Promise<Issue[]> {
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);

  const issue = await this.ormRepository.find({
   publishing_date: Between(startOfYear, endOfYear),
  });

  return issue;
 }
}
