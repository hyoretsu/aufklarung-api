import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
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
}
