import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import ICreateArticleDTO from '../dtos/ICreateArticleDTO';
import Article from '../infra/typeorm/entities/Article';
import IArticlesAuthorsRepository from '../repositories/IArticlesAuthorsRepository';
import IArticlesRepository from '../repositories/IArticlesRepository';

@injectable()
export default class CreateArticleService {
 constructor(
  @inject('ArticlesRepository')
  private articlesRepository: IArticlesRepository,

  @inject('ArticlesAuthorsRepository')
  private articlesAuthorsRepository: IArticlesAuthorsRepository,

  @inject('UsersRepository')
  private usersRepository: IUsersRepository,
 ) {}

 public async execute({ authors, file, title, ...articleInfo }: ICreateArticleDTO): Promise<Article> {
  const article = await this.articlesRepository.create({
   file,
   title,
   ...articleInfo,
  });

  await Promise.all(
   authors.map(async user_id => {
    const { id: article_id } = article;

    const existingUser = await this.usersRepository.findById(user_id);
    if (!existingUser) {
     throw new AppError('Um dos autores selecionados não existe. Tente novamente', 404);
    }

    await this.articlesAuthorsRepository.create({ article_id, user_id });
   }),
  );

  return article;
 }
}
