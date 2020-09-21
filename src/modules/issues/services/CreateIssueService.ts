import { inject } from 'tsyringe';

import Issue from '../infra/typeorm/entities/Issue';
import IIssuesRepository from '../repositories/IIssuesRepository';

interface IRequest {
 title?: string;
 description?: string;
 isSpecial: number;
}

export default class CreateIssueService {
 constructor(
  @inject('IssuesRepository')
  private issuesRepository: IIssuesRepository,
 ) {}

 public async execute({ description, isSpecial, title }: IRequest): Promise<Issue> {
  const article = await this.issuesRepository.create({
   title,
   description,
   isSpecial: !!isSpecial,
  });

  return article;
 }
}
