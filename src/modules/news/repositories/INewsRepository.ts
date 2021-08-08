import ICreateNewsDTO from '../dtos/ICreateNewsDTO';
import News from '../infra/typeorm/entities/News';

export default interface INewsRepository {
 create(data: ICreateNewsDTO): Promise<News>;
 findAll(): Promise<News[]>;
 findById(id: string): Promise<News | undefined>;
 findSame(data: Omit<ICreateNewsDTO, 'body'>): Promise<News | undefined>;
}
