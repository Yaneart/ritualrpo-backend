import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const admin = await this.prismaService.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const payload = { id: admin.id, email: admin.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async validate(id: string) {
    const admin = await this.prismaService.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return {
      id: admin.id,
      email: admin.email,
    };
  }
}
