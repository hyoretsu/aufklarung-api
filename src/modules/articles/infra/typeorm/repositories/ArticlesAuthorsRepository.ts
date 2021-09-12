import { getRepository, Repository } from 'typeorm';

import ILinkArticleDTO from '@modules/articles/dtos/ILinkArticleDTO';
import IArticlesAuthorsRepository from '@modules/articles/repositories/IArticlesAuthorsRepository';

import ArticleAuthor from '../entities/ArticleAuthor';

export default class ArticlesAuthorsRepository implements IArticlesAuthorsRepository {
 private ormRepository: Repository<ArticleAuthor>;

 constructor() {
  this.ormRepository = getRepository(ArticleAuthor);
 }

 public async create(data: ILinkArticleDTO): Promise<ArticleAuthor> {
  const link = this.ormRepository.create(data);

  await this.ormRepository.save(link);

  return link;
 }

 public async findByArticle(article_id: string): Promise<ArticleAuthor[]> {
  const links = await this.ormRepository.find({ article_id });

  return links;
 }
}
