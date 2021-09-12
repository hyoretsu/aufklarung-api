import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Article from '../infra/typeorm/entities/Article';
import IArticlesRepository from '../repositories/IArticlesRepository';

@injectable()
export default class ShowArticleService {
 constructor(
  @inject('ArticlesRepository')
  private articlesRepository: IArticlesRepository,
 ) {}

 public async execute(id: string): Promise<Article | undefined> {
  const article = await this.articlesRepository.findById(id);

  if (!article) {
   throw new AppError('Este artigo não existe. Tente novamente', 404);
  }

  return article;
 }
}
