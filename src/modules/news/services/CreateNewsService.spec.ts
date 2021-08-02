import AppError from '../../../shared/errors/AppError';
import FakeNewsRepository from '../repositories/fakes/FakeNewsRepository';
import CreateNewsService from './CreateNewsService';

let fakeNewsRepository: FakeNewsRepository;
let createNews: CreateNewsService;

describe('CreateNews', () => {
 beforeEach(() => {
  fakeNewsRepository = new FakeNewsRepository();
  createNews = new CreateNewsService(fakeNewsRepository);
 });

 it('should be able to create a new news', async () => {
  const news = await createNews.execute({
   title: 'Test title',
   description: 'Test description',
   body: 'Test',
  });

  expect(news).toHaveProperty('id');
 });

 it('should not be able to create news with already existing info', async () => {
  await createNews.execute({
   title: 'Test title',
   description: 'Test description',
   body: 'Test',
  });

  await expect(
   createNews.execute({
    title: 'Test title',
    description: 'Test description',
    body: 'Test',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });
});
