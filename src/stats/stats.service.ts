import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createStatDto: CreateStatDto) {
    return this.prismaService.stat.create({
      data: createStatDto,
    });
  }

  findAll() {
    return this.prismaService.stat.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async update(id: string, updateStatDto: UpdateStatDto) {
    const stat = await this.prismaService.stat.findUnique({
      where: {
        id,
      },
    });

    if (!stat) {
      throw new NotFoundException('Показатель не найден');
    }

    return this.prismaService.stat.update({
      where: {
        id,
      },
      data: updateStatDto,
    });
  }

  async remove(id: string) {
    const stat = await this.prismaService.stat.findUnique({
      where: {
        id,
      },
    });

    if (!stat) {
      throw new NotFoundException('Показатель не найден');
    }

    return this.prismaService.stat.delete({
      where: {
        id,
      },
    });
  }
}
