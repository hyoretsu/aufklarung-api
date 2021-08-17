import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

/** Checks whether the client is logged in or not */
export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
 const { session } = req;

 // Check if user's logged in
 if (!session.user_id) {
  throw new AppError('Você não está autenticado. Tente novamente', 401);
 }

 return next();
}
