import { Request, Response, NextFunction } from "express";
import {ObjectSchema} from 'joi';

export const genValidationMiddleware = (schema: ObjectSchema ) => {
  const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.error("Validation Error:", error);
      throw new Error(error.message);
    }
    next();
  };
  return validationMiddleware;
};
