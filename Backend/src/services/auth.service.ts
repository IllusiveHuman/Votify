import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { signToken } from '../utils/jwt.utils';
import { AppError } from '../middleware/errorHandler.middleware';
import { RegisterDto, LoginDto, ChangePasswordDto } from '../types/api.types';

const BCRYPT_ROUNDS = 12; // Баланс безпека/швидкість (рекомендовано OWASP)

export class AuthService {
  constructor(private readonly prisma: PrismaClient) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (existing) {
      throw new AppError(409, 'User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hashedPassword, name: dto.name },
      select: { id: true, email: true, name: true },
    });

    const token = signToken({ userId: user.id, email: user.email });
    return { token, user };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !(await bcrypt.compare(dto.currentPassword, user.password))) {
      throw new AppError(401, 'Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, BCRYPT_ROUNDS);
    await this.prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    // Однакове повідомлення для невірного email і пароля — захист від user enumeration
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new AppError(401, 'Invalid credentials');
    }

    const token = signToken({ userId: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }
}
