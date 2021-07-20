import { inject, injectable } from 'tsyringe';

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

  return issue;
 }
}
