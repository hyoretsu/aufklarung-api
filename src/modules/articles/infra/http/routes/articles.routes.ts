import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ArticlesController from '../controllers/ArticlesController';

const articlesRouter = Router();
const articlesController = new ArticlesController();

const upload = multer(uploadConfig.multer);

articlesRouter.post(
 '/',
 ensureAuthenticated,
 upload.single('file'),
 celebrate({
  body: {
   title: Joi.string().required(),
   coauthors: Joi.array().items(Joi.string()),
   section: Joi.string().required(),
   sponsor: Joi.string(),
   reference_list: Joi.string().required(),
  },
 }),
 articlesController.create,
);
articlesRouter.get('/:id', articlesController.show);

export default articlesRouter;
