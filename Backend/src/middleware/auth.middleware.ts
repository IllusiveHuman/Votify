import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/jwt.utils';
import { AuthenticatedRequest } from '../types/api.types';

// JWT middleware для захисту маршрутів організатора.
// Читає токен з Authorization: Bearer <token>.
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = extractTokenFromHeader(req.headers.authorization);

  if (!token) {
    res.status(401).json({ success: false, error: 'No token provided' });
    return;
  }

  try {
    const payload = verifyToken(token);
    (req as AuthenticatedRequest).user = { id: payload.userId, email: payload.email };
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}
