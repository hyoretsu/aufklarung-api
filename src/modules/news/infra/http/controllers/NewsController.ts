import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNewsService from '@modules/news/services/CreateNewsService';
import ListNewsService from '@modules/news/services/ListNewsService';

import ShowNewsService from '../../../services/ShowNewsService';

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

 public async list(req: Request, res: Response): Promise<Response> {
  const listNews = container.resolve(ListNewsService);

  const news = await listNews.execute();

  return res.json(news);
 }

 public async show(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const showNews = container.resolve(ShowNewsService);

  const news = await showNews.execute(id);

  return res.json(news);
 }
}
