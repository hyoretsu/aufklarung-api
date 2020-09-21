import ICreateIssueDTO from '../dtos/ICreateIssueDTO';
import Issue from '../infra/typeorm/entities/Issue';

export default interface IIssuesRepository {
 create(data: ICreateIssueDTO): Promise<Issue>;
}
