import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ArticlesAuthorsRepository from '@modules/articles/infra/typeorm/repositories/ArticlesAuthorsRepository';
import ArticlesRepository from '@modules/articles/infra/typeorm/repositories/ArticlesRepository';
import IArticlesAuthorsRepository from '@modules/articles/repositories/IArticlesAuthorsRepository';
import IArticlesRepository from '@modules/articles/repositories/IArticlesRepository';
import IssuesRepository from '@modules/issues/infra/typeorm/repositories/IssuesRepository';
import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';
import NewsRepository from '@modules/news/infra/typeorm/repositories/NewsRepository';
import INewsRepository from '@modules/news/repositories/INewsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IArticlesRepository>('ArticlesRepository', ArticlesRepository);
container.registerSingleton<IArticlesAuthorsRepository>('ArticlesAuthorsRepository', ArticlesAuthorsRepository);
container.registerSingleton<IIssuesRepository>('IssuesRepository', IssuesRepository);
container.registerSingleton<INewsRepository>('NewsRepository', NewsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
