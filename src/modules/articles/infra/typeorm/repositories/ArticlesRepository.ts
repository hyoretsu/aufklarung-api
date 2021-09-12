import { getRepository, Repository } from 'typeorm';

import ICreateArticleDTO from '@modules/articles/dtos/ICreateArticleDTO';
import IArticlesRepository from '@modules/articles/repositories/IArticlesRepository';

import Article from '../entities/Article';

export default class ArticlesRepository implements IArticlesRepository {
 private ormRepository: Repository<Article>;

 constructor() {
  this.ormRepository = getRepository(Article);
 }

 public async create(data: Omit<ICreateArticleDTO, 'authors'>): Promise<Article> {
  const article = this.ormRepository.create(data);

  await this.ormRepository.save(article);

  return article;
 }
}
