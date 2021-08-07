import { inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';
import INewsRepository from '../repositories/INewsRepository';

@injectable()
export default class ListNewsService {
 constructor(
  @inject('NewsRepository')
  private newsRepository: INewsRepository,
 ) {}

 public async execute(): Promise<News[]> {
  const news = this.newsRepository.findAll();

  return news;
 }
}
