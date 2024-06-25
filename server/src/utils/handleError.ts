import CustomError from './CustomError';
import { Response } from 'express';

export const handleError = (err: unknown, res: Response) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
