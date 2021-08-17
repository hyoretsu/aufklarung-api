import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

const adminRoutes = ['/issues', '/news', '/users', '/users/admin'];

/** Checks whether the client is logged in or not */
export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
 const { session, originalUrl: path } = req;

 // Check if user's logged in
 if (!session.user_id) {
  throw new AppError('Você não está autenticado. Tente novamente', 401);
 }

 // Check if it's an admin-only route
 if (adminRoutes.includes(path)) {
  if (!session.is_admin) {
   throw new AppError('Você não tem permissão para realizar essa operação', 403);
  }
 }

 return next();
}
