import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdvantageDto } from './dto/create-advantage.dto';
import { UpdateAdvantageDto } from './dto/update-advantage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdvantagesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAdvantageDto: CreateAdvantageDto) {
    return this.prismaService.advantage.create({
      data: createAdvantageDto,
    });
  }

  findAll() {
    return this.prismaService.advantage.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async update(id: string, updateAdvantageDto: UpdateAdvantageDto) {
    const advantage = await this.prismaService.advantage.findUnique({
      where: {
        id,
      },
    });

    if (!advantage) {
      throw new NotFoundException('Преимущество не найдено');
    }

    return this.prismaService.advantage.update({
      where: {
        id,
      },
      data: updateAdvantageDto,
    });
  }

  async remove(id: string) {
    const advantage = await this.prismaService.advantage.findUnique({
      where: {
        id,
      },
    });

    if (!advantage) {
      throw new NotFoundException('Преимущество не найдено');
    }

    return this.prismaService.advantage.delete({
      where: {
        id,
      },
    });
  }
}
