import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', ensureAuthenticated, usersController.list);
usersRouter.post(
 '/',
 celebrate({
  body: {
   first_name: Joi.string().required(),
   last_name: Joi.string().required(),
   email: Joi.string().required(),
   password: Joi.string().required(),
   university: Joi.string().required(),
   country: Joi.string().required(),
   phone: Joi.number(),
   orcid: Joi.number(),
   lattes: Joi.string(),
  },
 }),
 usersController.create,
);
usersRouter.post(
 '/login',
 celebrate({
  body: {
   email: Joi.string().email().required(),
   password: Joi.string().required(),
  },
 }),
 usersController.authenticate,
);
usersRouter.get('/logout', ensureAuthenticated, usersController.logout);
usersRouter.get('/:id', usersController.show);

export default usersRouter;
