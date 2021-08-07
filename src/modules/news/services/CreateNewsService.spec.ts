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
   title: 'test1-1',
   description: 'test1-2',
   body: 'test1-3',
  });

  expect(news).toHaveProperty('id');
 });

 it('should not be able to create news with already existing info', async () => {
  await createNews.execute({
   title: 'test1-1',
   description: 'test1-2',
   body: 'test1-3',
  });

  await expect(
   createNews.execute({
    title: 'test1-1',
    description: 'test1-2',
    body: 'test1-3',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });
});
