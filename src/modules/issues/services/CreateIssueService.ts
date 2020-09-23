import { getYear } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Issue from '../infra/typeorm/entities/Issue';
import IIssuesRepository from '../repositories/IIssuesRepository';

interface IRequest {
 title?: string;
 description?: string;
 isSpecial: number;
}

@injectable()
export default class CreateIssueService {
 constructor(
  @inject('IssuesRepository')
  private issuesRepository: IIssuesRepository,
 ) {}

 public async execute({ description, isSpecial, title }: IRequest): Promise<Issue> {
  const currentYear = getYear(Date.now());
  const volume = currentYear - 2013;

  let number: number | undefined;
  // if (isSpecial === false) {
  //  const publishedIssues = await this.ormRepository.find({
  //   where: {
  //    publishing_date: currentYear,
  //   },
  //  });
  //  number = publishedIssues.length + 1;
  // }

  let defaultTitle = 'none';
  if (!title) {
   switch (number) {
    case 1:
     defaultTitle = 'Janeiro-Abril';
     break;
    case 2:
     defaultTitle = 'Maio-Agosto';
     break;
    case 3:
     defaultTitle = 'Setembro-Dezembro';
   }
  }

  const article = await this.issuesRepository.create({
   title: title || defaultTitle,
   volume,
   number,
   description,
   isSpecial: !!isSpecial,
  });

  return article;
 }
}
