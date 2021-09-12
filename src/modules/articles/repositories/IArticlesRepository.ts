import ICreateArticleDTO from '../dtos/ICreateArticleDTO';
import Article from '../infra/typeorm/entities/Article';

export default interface IArticlesRepository {
 create(data: Omit<ICreateArticleDTO, 'authors'>): Promise<Article>;
 findById(id: string): Promise<Article | undefined>;
}
