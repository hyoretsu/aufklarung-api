import AppError from '@shared/errors/AppError';

import FakeNewsRepository from '../repositories/fakes/FakeNewsRepository';
import ShowNewsService from './ShowNewsService';

let fakeNewsRepository: FakeNewsRepository;
let showNews: ShowNewsService;

describe('ShowNews', () => {
 beforeEach(() => {
  fakeNewsRepository = new FakeNewsRepository();
  showNews = new ShowNewsService(fakeNewsRepository);
 });

 it('should be able to show an existing news', async () => {
  const news = await fakeNewsRepository.create({
   title: 'test1-1',
   description: 'test1-2',
   body: 'test1-3',
  });

  const foundNews = await showNews.execute(news.id);

  expect(foundNews).toStrictEqual(news);
 });

 it('should not be able to show a non-existing news', async () => {
  await expect(showNews.execute('testId')).rejects.toBeInstanceOf(AppError);
 });
});
