import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.list);
usersRouter.post(
 '/',
 celebrate({
  [Segments.BODY]: {
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
usersRouter.get('/:id', usersController.show);

export default usersRouter;
