import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

import FakeArticlesAuthorsRepository from '../repositories/fakes/FakeArticlesAuthorsRepository';
import FakeArticlesRepository from '../repositories/fakes/FakeArticlesRepository';
import CreateArticleService from './CreateArticleService';

let fakeArticlesRepository: FakeArticlesRepository;
let fakeArticlesAuthorsRepository: FakeArticlesAuthorsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createArticle: CreateArticleService;

describe('CreateArticle', () => {
 beforeEach(() => {
  fakeArticlesRepository = new FakeArticlesRepository();
  fakeArticlesAuthorsRepository = new FakeArticlesAuthorsRepository();
  fakeUsersRepository = new FakeUsersRepository();
  createArticle = new CreateArticleService(fakeArticlesRepository, fakeArticlesAuthorsRepository, fakeUsersRepository);
 });

 it('should be able to create an article', async () => {
  const author1 = await fakeUsersRepository.create({
   first_name: 'Jane',
   last_name: 'Doe',
   email: 'test@email.com',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  const article = await createArticle.execute({
   authors: [author1.id],
   file: 'testFile',
   reference_list: 'testReferences',
   section: 'article',
   title: 'test',
  });

  expect(article).toHaveProperty('id');
 });

 it('should be able to create an article with multiple authors', async () => {
  const author1 = await fakeUsersRepository.create({
   first_name: 'John',
   last_name: 'Doe',
   email: 'test@email.com',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });
  const author2 = await fakeUsersRepository.create({
   first_name: 'Jane',
   last_name: 'Doe',
   email: 'test@email.com',
   password: '123123',
   university: 'UDCG',
   country: 'Brasil',
  });

  const article = await createArticle.execute({
   authors: [author1.id, author2.id],
   file: 'testFile',
   reference_list: 'testReferences',
   section: 'article',
   title: 'test',
  });
  const authors = (await fakeArticlesAuthorsRepository.findByArticle(article.id)).map(link => link.user_id);

  expect(article).toHaveProperty('id');
  expect(authors).toEqual([author1.id, author2.id]);
 });

 it('should not be able to create an article with inexistent authors', async () => {
  await expect(
   createArticle.execute({
    authors: ['testId'],
    file: 'testFile',
    reference_list: 'testReferences',
    section: 'article',
    title: 'test',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });
});
