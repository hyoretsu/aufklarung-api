import { container } from 'tsyringe';

import './providers';

import IssuesRepository from '@modules/issues/infra/typeorm/repositories/IssuesRepository';
import IIssuesRepository from '@modules/issues/repositories/IIssuesRepository';
import NewsRepository from '@modules/news/infra/typeorm/repositories/NewsRepository';
import INewsRepository from '@modules/news/repositories/INewsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IIssuesRepository>('IssuesRepository', IssuesRepository);
container.registerSingleton<INewsRepository>('NewsRepository', NewsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
