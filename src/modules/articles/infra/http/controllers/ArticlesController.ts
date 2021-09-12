import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateArticleService from '@modules/articles/services/CreateArticleService';
import ShowArticleService from '@modules/articles/services/ShowArticleService';

export default class ArticlesController {
 public async create(req: Request, res: Response): Promise<Response> {
  const { user_id } = req.session;
  const { title, coauthors, section, sponsor, reference_list } = req.body;

  const createArticle = container.resolve(CreateArticleService);

  const article = await createArticle.execute({
   authors: [user_id, ...coauthors],
   file: req.file.filename,
   title,
   section,
   sponsor,
   reference_list,
  });

  return res.json(article);
 }

 public async show(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const showArticle = container.resolve(ShowArticleService);

  const article = await showArticle.execute(id);

  return res.json(article);
 }
}
