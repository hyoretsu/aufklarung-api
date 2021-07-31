export default interface IHashProvider {
 generate(password: string): Promise<string>;
 compare(password: string, hashedPassword: string): Promise<boolean>;
}
