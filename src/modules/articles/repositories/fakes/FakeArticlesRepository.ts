/* eslint-disable require-await */
import ICreateArticleDTO from '../../dtos/ICreateArticleDTO';
import Article from '../../infra/typeorm/entities/Article';
import IArticlesRepository from '../IArticlesRepository';

export default class FakeArticlesRepository implements IArticlesRepository {
 private articles: Article[] = [];

 public async create(data: Omit<ICreateArticleDTO, 'authors'>): Promise<Article> {
  const article = new Article();

  Object.assign(article, data);
  this.articles.push(article);

  return article;
 }

 public async findById(id: string): Promise<Article | undefined> {
  const foundArticle = this.articles.find(article => article.id === id);

  return foundArticle;
 }
}
