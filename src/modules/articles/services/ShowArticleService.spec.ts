import AppError from '@shared/errors/AppError';

import FakeArticlesRepository from '../repositories/fakes/FakeArticlesRepository';
import ShowArticleService from './ShowArticleService';

let fakeArticlesRepository: FakeArticlesRepository;
let showArticle: ShowArticleService;

describe('ShowArticle', () => {
 beforeEach(() => {
  fakeArticlesRepository = new FakeArticlesRepository();
  showArticle = new ShowArticleService(fakeArticlesRepository);
 });

 it('should be able to find an article', async () => {
  const article = await fakeArticlesRepository.create({
   file: 'testFile',
   reference_list: 'testReferences',
   section: 'article',
   title: 'test',
  });

  const foundArticle = await showArticle.execute(article.id);

  expect(foundArticle).toStrictEqual(article);
 });

 it('should not be able to find a non-existing article', async () => {
  await expect(showArticle.execute('testId')).rejects.toBeInstanceOf(AppError);
 });
});
