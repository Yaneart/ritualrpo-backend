import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class CalculatorGroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createGroupDto: CreateGroupDto) {
    return this.prismaService.calculatorGroup.create({
      data: createGroupDto,
    });
  }

  findAll() {
    return this.prismaService.calculatorGroup.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        options: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdateGroupDto) {
    const item = await this.prismaService.calculatorGroup.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Группа не найдена');
    }

    return this.prismaService.calculatorGroup.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    const item = await this.prismaService.calculatorGroup.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Группа не найдена');
    }

    return this.prismaService.calculatorGroup.delete({
      where: {
        id,
      },
    });
  }
}
