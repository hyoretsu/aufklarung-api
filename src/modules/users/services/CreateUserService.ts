import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
 constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,

  @inject('HashProvider')
  private hashProvider: IHashProvider,
 ) {}

 public async execute({ email, password, orcid, ...userInfo }: ICreateUserDTO): Promise<User> {
  const existingEmail = await this.usersRepository.findByEmail(email);
  if (existingEmail) {
   throw new AppError('Um usuário com este email já existe', 403);
  }

  if (orcid) {
   const existingOrcid = await this.usersRepository.findByOrcid(orcid);

   if (existingOrcid) {
    throw new AppError('Um usuário com este ORCID já existe', 403);
   }
  }

  const hashedPassword = await this.hashProvider.generate(password);

  const user = await this.usersRepository.create({
   email,
   password: hashedPassword,
   orcid,
   ...userInfo,
  });

  return user;
 }
}
