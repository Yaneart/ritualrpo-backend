import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class CalculatorOptionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOptionDto: CreateOptionDto) {
    await this.ensureGroupExists(createOptionDto.groupId);

    return this.prismaService.calculatorOption.create({
      data: createOptionDto,
    });
  }

  async update(id: string, dto: UpdateOptionDto) {
    const item = await this.prismaService.calculatorOption.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Опция не найдена');
    }

    if (dto.groupId) {
      await this.ensureGroupExists(dto.groupId);
    }

    return this.prismaService.calculatorOption.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    const item = await this.prismaService.calculatorOption.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Опция не найдена');
    }

    return this.prismaService.calculatorOption.delete({
      where: {
        id,
      },
    });
  }

  private async ensureGroupExists(groupId: string) {
    const group = await this.prismaService.calculatorGroup.findUnique({
      where: {
        id: groupId,
      },
    });

    if (!group) {
      throw new BadRequestException(`Группа с id ${groupId} не найдена`);
    }
  }
}
