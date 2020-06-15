import { Router } from 'express';

import exampleRouter from '@modules/example/infra/http/routes/example.routes

const routes = Router();

routes.use('/', exampleRouter);

export default routes;
