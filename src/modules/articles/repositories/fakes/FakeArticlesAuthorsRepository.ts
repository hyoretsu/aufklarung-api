/* eslint-disable require-await */
import ILinkArticleDTO from '../../dtos/ILinkArticleDTO';
import ArticleAuthor from '../../infra/typeorm/entities/ArticleAuthor';
import IArticlesAuthorsRepository from '../IArticlesAuthorsRepository';

export default class FakeArticlesAuthorsRepository implements IArticlesAuthorsRepository {
 private articlesAuthors: ArticleAuthor[] = [];

 public async create(data: ILinkArticleDTO): Promise<ArticleAuthor> {
  const articleAuthor = new ArticleAuthor();

  Object.assign(articleAuthor, data);

  this.articlesAuthors.push(articleAuthor);

  return articleAuthor;
 }

 public async findByArticle(article_id: string): Promise<ArticleAuthor[]> {
  const links = this.articlesAuthors.filter(link => link.article_id === article_id);

  return links;
 }
}
