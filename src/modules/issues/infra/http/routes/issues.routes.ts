import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import IssuesController from '../controllers/IssuesController';

const issuesRouter = Router();
const issuesController = new IssuesController();

issuesRouter.post(
 '/create',
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
