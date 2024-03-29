import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
 create(data: ICreateUserDTO): Promise<User>;
 findAll(): Promise<User[]>;
 findByEmail(email: string): Promise<User | undefined>;
 findById(id: string): Promise<User | undefined>;
 findByOrcid(orcid: number): Promise<User | undefined>;
 save(user: User): Promise<User | undefined>;
}
