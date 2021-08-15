import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import ShowUserService from '@modules/users/services/ShowUserService';

export default class UsersController {
 public async authenticate(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const userInfo = await authenticateUser.execute({
   email,
   password,
  });
  Object.assign(req.session, userInfo);

  return res.json({ session: req.session });
 }

 public async create(req: Request, res: Response): Promise<Response> {
  const { first_name, last_name, email, password, university, country, phone, orcid, lattes } = req.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({
   first_name,
   last_name,
   email,
   password,
   university,
   country,
   phone,
   orcid,
   lattes,
  });

  return res.json(user);
 }

 public async list(req: Request, res: Response): Promise<Response> {
  const listUsers = container.resolve(ListUsersService);

  const users = await listUsers.execute();

  return res.json(users);
 }

 public async logout(req: Request, res: Response): Promise<Response> {
  req.session.destroy(err => {
   err && console.log(err);
  });

  return res.status(204).json();
 }

 public async show(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const showUser = container.resolve(ShowUserService);

  const user = await showUser.execute(id);

  return res.json(user);
 }
}
