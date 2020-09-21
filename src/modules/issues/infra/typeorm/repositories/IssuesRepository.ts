import { getYear } from 'date-fns';
import { getRepository, Repository } from 'typeorm';

import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';

import ICreateIssueDTO from '../../../dtos/ICreateIssueDTO';
import Issue from '../entities/Issue';

export default class IssuesRepository implements IIssuesRepository {
 private ormRepository: Repository<Issue>;

 constructor() {
  this.ormRepository = getRepository(Issue);
 }

 public async create({ title, description, isSpecial }: ICreateIssueDTO): Promise<Issue> {
  const currentYear = getYear(Date.now());
  const volume = currentYear - 2013;

  let number: number | undefined;
  if (isSpecial === false) {
   const publishedIssues = await this.ormRepository.find({
    where: {
     publishing_date: currentYear,
    },
   });
   number = publishedIssues.length + 1;
  }

  let defaultTitle = 'none';
  if (!title) {
   if (number === 1) {
    defaultTitle = 'Janeiro-Abril';
   } else if (number === 2) {
    defaultTitle = 'Maio-Agosto';
   } else if (number === 3) {
    defaultTitle = 'Setembro-Dezembro';
   }
  }

  const issue = await this.ormRepository.create({
   title: title || defaultTitle,
   volume,
   number,
   description,
   is_special: isSpecial,
  });

  return issue;
 }
}
