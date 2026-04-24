import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.siteSetting.findMany({
      orderBy: { key: 'asc' },
    });
  }

  upsert(key: string, dto: UpdateSettingDto) {
    return this.prisma.siteSetting.upsert({
      where: { key },
      update: { value: dto.value },
      create: { key, value: dto.value },
    });
  }
}
