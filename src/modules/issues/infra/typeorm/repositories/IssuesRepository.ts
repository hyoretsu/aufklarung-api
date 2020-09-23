import { getRepository, Repository } from 'typeorm';

import ICreateIssueDTO from '@modules/issues/dtos/ICreateIssueDTO';
import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';

import Issue from '../entities/Issue';

export default class IssuesRepository implements IIssuesRepository {
 private ormRepository: Repository<Issue>;

 constructor() {
  this.ormRepository = getRepository(Issue);
 }

 public async create({ title, volume, number, description, isSpecial }: ICreateIssueDTO): Promise<Issue> {
  const issue = this.ormRepository.create({
   title,
   volume,
   number,
   description,
   is_special: isSpecial,
  });

  await this.ormRepository.save(issue);

  return issue;
 }
}
