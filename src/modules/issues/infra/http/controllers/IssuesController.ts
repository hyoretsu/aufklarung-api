import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateIssueService from '@modules/issues/services/CreateIssueService';

export default class IssuesController {
 public async create(req: Request, res: Response): Promise<Response> {
  const { title, description, isSpecial } = req.body;

  const createIssue = container.resolve(CreateIssueService);

  const issue = await createIssue.execute({
   title,
   description,
   isSpecial,
  });

  return res.json(issue);
 }
}
