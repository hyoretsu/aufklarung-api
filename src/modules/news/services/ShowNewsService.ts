import { inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';
import INewsRepository from '../repositories/INewsRepository';

@injectable()
export default class ShowNewsService {
 constructor(
  @inject('NewsRepository')
  private newsRepository: INewsRepository,
 ) {}

 public async execute(id: string): Promise<News | undefined> {
  const news = await this.newsRepository.findById(id);

  return news;
 }
}
