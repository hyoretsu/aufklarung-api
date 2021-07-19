import { inject, injectable } from 'tsyringe';

import Issue from '../infra/typeorm/entities/Issue';
import IIssuesRepository from '../repositories/IIssuesRepository';

@injectable()
export default class ListIssuesService {
 constructor(
  @inject('IssuesRepository')
  private issuesRepository: IIssuesRepository,
 ) {}

 public async execute(): Promise<Issue[]> {
  const issues = await this.issuesRepository.findAll();

  return issues;
 }
}
