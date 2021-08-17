import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import NewsController from '../controllers/NewsController';

const newsRouter = Router();
const newsController = new NewsController();

newsRouter.get('/', newsController.list);
newsRouter.post(
 '/',
 ensureAuthenticated,
 celebrate({
  body: {
   title: Joi.string().required(),
   description: Joi.string().required(),
   body: Joi.string().required(),
  },
 }),
 newsController.create,
);
newsRouter.get('/:id', newsController.show);

export default newsRouter;
