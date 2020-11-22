import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { NotAuthorizedError } from '../errors/not-authorized';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
   if(!req.currentUser){
     next(new NotAuthorizedError())
   }

  next();
};
