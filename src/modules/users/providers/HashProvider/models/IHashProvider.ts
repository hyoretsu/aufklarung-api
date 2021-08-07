export default interface IHashProvider {
 /** Hashes the given password */
 generate(password: string): Promise<string>;
 /** Checks if the given password is the same as hashed one */
 compare(password: string, hashedPassword: string): Promise<boolean>;
}
