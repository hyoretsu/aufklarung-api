import ICreateNewsDTO from '../dtos/ICreateNewsDTO';
import News from '../infra/typeorm/entities/News';

export default interface INewsRepository {
 create(data: ICreateNewsDTO): Promise<News>;
 findSame(data: Omit<ICreateNewsDTO, 'body'>): Promise<News | undefined>;
}
