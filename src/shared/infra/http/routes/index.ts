import { Router } from 'express';

import issuesRouter from '@modules/issues/infra/http/routes/issues.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/issues', issuesRouter);
routes.use('/users', usersRouter);

export default routes;
