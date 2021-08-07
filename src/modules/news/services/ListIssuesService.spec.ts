import FakeNewsRepository from '../repositories/fakes/FakeNewsRepository';
import ListNewsService from './ListNewsService';

let fakeNewsRepository: FakeNewsRepository;
let listNews: ListNewsService;

describe('ListNews', () => {
 beforeEach(() => {
  fakeNewsRepository = new FakeNewsRepository();
  listNews = new ListNewsService(fakeNewsRepository);
 });

 it('should be able to list existing News', async () => {
  const news1 = await fakeNewsRepository.create({
   title: 'test1-1',
   description: 'test1-2',
   body: 'test1-3',
  });
  const news2 = await fakeNewsRepository.create({
   title: 'test2-1',
   description: 'test2-2',
   body: 'test2-3',
  });

  const news = await listNews.execute();

  expect(news).toStrictEqual([news1, news2]);
 });
});
