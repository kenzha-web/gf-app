import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Замените `any` на конкретный тип, если известно
    }
  }
}
