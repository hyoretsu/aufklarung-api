import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors({origin:}));
app.use(express.json());
app.use(routes);

app.use(errors);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
 if (err instanceof AppError) {
  return res.status(err.statusCode).json({
   status: 'error',
   message: 'err.message',
  });
 }

 return res.status(500).json({
  status: 'error',
  message: 'Internal server error',
 });
});

app.listen(3333);
