export default interface ICreateUserDTO {
 first_name: string;
 last_name: string;
 email: string;
 password: string;
 university: string;
 country: string;
 phone?: number;
 orcid?: number;
 lattes?: string;
}
