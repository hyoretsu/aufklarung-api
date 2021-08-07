import { v4 as uuidv4 } from 'uuid';

import News from '@modules/news/infra/typeorm/entities/News';

import ICreateNewsDTO from '../../dtos/ICreateNewsDTO';
import INewsRepository from '../INewsRepository';

export default class FakeNewsRepository implements INewsRepository {
 private news: News[] = [];

 public async create(newsData: ICreateNewsDTO): Promise<News> {
  const news = new News();
  const date = new Date();

  // Create news object
  Object.assign(
   news,
   {
    id: uuidv4(),
    created_at: date,
    updated_at: date,
   },
   newsData,
  );
  this.news.push(news);

  return news;
 }

 public async findSame({ title, description }: Omit<ICreateNewsDTO, 'body'>): Promise<News | undefined> {
  const foundNews = this.news.find(news => {
   if (news.title === title && news.description === description) {
    return true;
   }

   return false;
  });

  return foundNews;
 }
}
