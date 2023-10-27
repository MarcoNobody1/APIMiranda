import { RequestHeadersInterface } from '../models/RequestHeaders';
import authService from '../services/login'
import { NextFunction, Request, Response } from 'express'

export default function authMiddleware(req: Request & {headers: Partial<RequestHeadersInterface>}, res: Response, next: NextFunction) {
  try {
    const token = req.get('token') || '';
    authService.verifyJWT(token);
    next();

  } catch (error) {
    res.status(401).json({error: true, message: "You're not authorized!"})
  }
}