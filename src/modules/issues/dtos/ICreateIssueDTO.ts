export default interface ICreateIssueDTO {
 title?: string;
 volume: number;
 number?: number;
 description?: string;
 is_special: boolean;
 cover?: string;
}
