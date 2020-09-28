import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import IssuesController from '../controllers/IssuesController';

const issuesRouter = Router();
const issuesController = new IssuesController();

const upload = multer(uploadConfig.multer);

issuesRouter.post(
 '/create',
 upload.single('cover'),
 celebrate({
  [Segments.BODY]: {
   title: Joi.string(),
   description: Joi.string(),
   isSpecial: Joi.number().required(),
  },
 }),
 issuesController.create,
);

export default issuesRouter;
