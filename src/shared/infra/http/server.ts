/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

const isProduction = app.get('env') === 'production';

// Set up Cross-Origin Resource Sharing
app.use(cors({ origin: process.env.APP_API_URL }));
// Recognize incoming requests as JSON
app.use(express.json());
// Set static file serving route
app.use('/files', express.static(uploadConfig.uploadsFolder));
// Enable login using sessions
app.use(
 session({
  cookie: {
   // Total of 1 day
   maxAge: 24 * 60 * 60 * 1000,
   // Enables HTTPS on production env
   secure: isProduction,
  },
  resave: true,
  saveUninitialized: true,
  secret: process.env.APP_SECRET as string,
 }),
);
// Register app routes
app.use(routes);
// Enable request validation errors
app.use(errors());

// Custom error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
 // Intentional errors
 if (err instanceof AppError) {
  return res.status(err.statusCode).json({
   status: 'error',
   message: err.message,
  });
 }

 // Unpredicted errors
 return res.status(500).json({
  status: 'error',
  message: 'Internal server error',
 });
});

const port = process.env.PORT || 3333;

// Starting the server
app.listen(port, () => {
 console.log(`Server started on port ${port}!`);
});
