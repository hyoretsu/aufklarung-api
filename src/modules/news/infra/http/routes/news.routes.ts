import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import NewsController from '../controllers/NewsController';

const newsRouter = Router();
const newsController = new NewsController();

newsRouter.post(
 '/',
 celebrate({
  [Segments.BODY]: {
   title: Joi.string().required(),
   description: Joi.string().required(),
   body: Joi.string().required(),
  },
 }),
 newsController.create,
);

export default newsRouter;
