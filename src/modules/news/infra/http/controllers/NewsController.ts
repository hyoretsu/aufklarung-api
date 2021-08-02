import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNewsService from '@modules/news/services/CreateNewsService';

export default class NewsController {
 public async create(req: Request, res: Response): Promise<Response> {
  const { title, description, body } = req.body;

  const createNews = container.resolve(CreateNewsService);

  const news = await createNews.execute({
   title,
   description,
   body,
  });

  return res.json(news);
 }
}
