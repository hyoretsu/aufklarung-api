import {Router} from 'express';

import ExamplesController from '../controllers/ExamplesController';

const exampleRouter = Router()
const examplesController = new ExamplesController()

exampleRouter.get('/', examplesController.create);

export default exampleRouter;
