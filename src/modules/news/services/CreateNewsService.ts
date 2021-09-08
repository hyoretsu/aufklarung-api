import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ICreateNewsDTO from '../dtos/ICreateNewsDTO';
import News from '../infra/typeorm/entities/News';
import INewsRepository from '../repositories/INewsRepository';

@injectable()
export default class CreateNewsService {
 constructor(
  @inject('NewsRepository')
  private newsRepository: INewsRepository,
 ) {}

 public async execute({ title, description, body, publishing_date }: ICreateNewsDTO): Promise<News> {
  const existingNews = await this.newsRepository.findSame({ title, description });

  if (existingNews) {
   throw new AppError('Uma notícia com o mesmo nome e descrição já existe', 403);
  }

  const news = await this.newsRepository.create({
   title,
   description,
   body,
   publishing_date,
  });

  return news;
 }
}
