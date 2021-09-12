import ILinkArticleDTO from '../dtos/ILinkArticleDTO';
import ArticleAuthor from '../infra/typeorm/entities/ArticleAuthor';

export default interface IArticlesUsersRepository {
 create(data: ILinkArticleDTO): Promise<ArticleAuthor>;
 findByArticle(article_id: string): Promise<ArticleAuthor[]>;
}
