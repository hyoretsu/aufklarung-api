import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Issue from '../infra/typeorm/entities/Issue';
import IIssuesRepository from '../repositories/IIssuesRepository';

@injectable()
export default class ShowIssueService {
 constructor(
  @inject('IssuesRepository')
  private issuesRepository: IIssuesRepository,
 ) {}

 public async execute(id: string): Promise<Issue | undefined> {
  const issue = await this.issuesRepository.findById(id);

  if (!issue) {
   throw new AppError('Este número não existe. Tente novamente');
  }

  return issue;
 }
}
