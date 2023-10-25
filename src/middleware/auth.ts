import authService from '../services/login'
import { NextFunction, Request, Response } from 'express'

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the jwt token from the headers and verify it
}