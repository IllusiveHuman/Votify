import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

// =============================================================
// Генератор унікального PIN-коду сесії.
//
// Використовуємо crypto.randomInt (криптографічно безпечний PRNG)
// замість Math.random, щоб PIN не можна було передбачити.
// Collision probability для 6 цифр: ~0.001% за 100 активних сесій.
// =============================================================

const MAX_ATTEMPTS = 10;

export async function generateUniquePin(prisma: PrismaClient): Promise<string> {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    // 100000–999999 гарантує рівно 6 цифр
    const pin = String(crypto.randomInt(100_000, 999_999));

    const existing = await prisma.session.findUnique({ where: { pin } });
    if (!existing) return pin;
  }

  throw new Error(`Failed to generate unique PIN after ${MAX_ATTEMPTS} attempts`);
}

// UUID v4 для ідентифікації учасника між реконнектами
export function generateParticipantId(): string {
  return crypto.randomUUID();
}
