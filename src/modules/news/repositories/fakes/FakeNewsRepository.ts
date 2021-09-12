/* eslint-disable require-await */
import News from '@modules/news/infra/typeorm/entities/News';

import ICreateNewsDTO from '../../dtos/ICreateNewsDTO';
import INewsRepository from '../INewsRepository';

export default class FakeNewsRepository implements INewsRepository {
 private news: News[] = [];

 public async create(newsData: ICreateNewsDTO): Promise<News> {
  const news = new News();

  // Create news object
  Object.assign(news, newsData);
  this.news.push(news);

  return news;
 }

 public async findAll(): Promise<News[]> {
  return this.news;
 }

 public async findById(id: string): Promise<News | undefined> {
  const foundNews = this.news.find(news => news.id === id);

  return foundNews;
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
