import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CalculatorServiceTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createServiceTypeDto: CreateServiceTypeDto) {
    return this.prismaService.calculatorServiceType.create({
      data: createServiceTypeDto,
    });
  }

  findAll() {
    return this.prismaService.calculatorServiceType.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async update(id: string, dto: UpdateServiceTypeDto) {
    const item = await this.prismaService.calculatorServiceType.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Тип услуги не найден');
    }

    return this.prismaService.calculatorServiceType.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    const item = await this.prismaService.calculatorServiceType.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Тип услуги не найден');
    }

    return this.prismaService.calculatorServiceType.delete({
      where: {
        id,
      },
    });
  }
}
