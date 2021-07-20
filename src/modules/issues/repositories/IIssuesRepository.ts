import ICreateIssueDTO from '../dtos/ICreateIssueDTO';
import Issue from '../infra/typeorm/entities/Issue';

export default interface IIssuesRepository {
 create(data: ICreateIssueDTO): Promise<Issue>;
 findAll(): Promise<Issue[]>;
 findById(id: string): Promise<Issue | undefined>;
 findByYear(year: number): Promise<Issue[]>;
}
