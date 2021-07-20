import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateIssueService from '@modules/issues/services/CreateIssueService';
import ListIssuesService from '@modules/issues/services/ListIssuesService';
import ShowIssueService from '@modules/issues/services/ShowIssueService';

export default class IssuesController {
 public async create(req: Request, res: Response): Promise<Response> {
  const { title, description, isSpecial } = req.body;

  const createIssue = container.resolve(CreateIssueService);

  let issue;
  if (req.file) {
   issue = await createIssue.execute({
    title,
    description,
    isSpecial,
    coverFilename: req.file.filename,
    coverEncoding: req.file.mimetype,
   });
  } else {
   issue = await createIssue.execute({
    title,
    description,
    isSpecial,
   });
  }

  return res.json(issue);
 }

 public async list(req: Request, res: Response): Promise<Response> {
  const listIssues = container.resolve(ListIssuesService);

  const issues = await listIssues.execute();

  return res.json(classToClass(issues));
 }

 public async show(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const showIssue = container.resolve(ShowIssueService);

  const issue = await showIssue.execute(id);

  return res.json(classToClass(issue));
 }
}
