import { Router } from 'express';

import issuesRouter from '@modules/issues/infra/http/routes/issues.routes';
import newsRouter from '@modules/news/infra/http/routes/news.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/issues', issuesRouter);
routes.use('/news', newsRouter);
routes.use('/users', usersRouter);

export default routes;
