import { Request, Response, NextFunction } from 'express';

// Кастомна помилка з HTTP статус кодом
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Глобальний обробник помилок Express.
// 4 параметри — обов'язково, інакше Express не розпізнає як error handler.
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Zod validation errors
  if (err.name === 'ZodError') {
    res.status(400).json({ success: false, error: 'Validation error', details: err.message });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.code && { code: err.code }),
    });
    return;
  }

  console.error('[Unhandled Error]', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
}
