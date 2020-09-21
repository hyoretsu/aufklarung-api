import { Router } from 'express';

import issuesRouter from '@modules/issues/infra/http/routes/issues.routes';

const routes = Router();

routes.use('/issues', issuesRouter);

export default routes;
