import { getRepository, Repository } from 'typeorm';

import ICreateNewsDTO from '@modules/news/dtos/ICreateNewsDTO';
import INewsRepository from '@modules/news/repositories/INewsRepository';

import News from '../entities/News';

export default class NewsRepository implements INewsRepository {
 private ormRepository: Repository<News>;

 constructor() {
  this.ormRepository = getRepository(News);
 }

 public async create(newsData: ICreateNewsDTO): Promise<News> {
  const news = this.ormRepository.create(newsData);

  await this.ormRepository.save(news);

  return news;
 }

 public async findSame({ title, description }: Omit<ICreateNewsDTO, 'body'>): Promise<News | undefined> {
  const foundNews = await this.ormRepository.findOne({ title, description });

  return foundNews;
 }
}
