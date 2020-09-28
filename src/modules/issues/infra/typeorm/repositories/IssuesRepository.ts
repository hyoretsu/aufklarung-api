import { getRepository, Raw, Repository } from 'typeorm';

import ICreateIssueDTO from '@modules/issues/dtos/ICreateIssueDTO';
import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';

import Issue from '../entities/Issue';

export default class IssuesRepository implements IIssuesRepository {
 private ormRepository: Repository<Issue>;

 constructor() {
  this.ormRepository = getRepository(Issue);
 }

 public async create({ title, volume, number, description, isSpecial, cover }: ICreateIssueDTO): Promise<Issue> {
  const issue = this.ormRepository.create({
   title,
   volume,
   number,
   description,
   is_special: isSpecial,
   cover,
  });

  await this.ormRepository.save(issue);

  return issue;
 }

 public async findByYear(year: number): Promise<Issue[]> {
  const issue = await this.ormRepository.find({
   where: {
    created_at: Raw(date => `to_char(${date},'YYYY') = '${year}'`),
   },
  });

  return issue;
 }
}
