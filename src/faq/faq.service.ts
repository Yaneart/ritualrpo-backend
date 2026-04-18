import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createFaqDto: CreateFaqDto) {
    return this.prismaService.faq.create({
      data: createFaqDto,
    });
  }

  findAll() {
    return this.prismaService.faq.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    const faq = await this.prismaService.faq.findUnique({
      where: {
        id,
      },
    });

    if (!faq) {
      throw new NotFoundException('Вопрос не найден');
    }

    return this.prismaService.faq.update({
      where: {
        id,
      },
      data: updateFaqDto,
    });
  }

  async remove(id: string) {
    const faq = await this.prismaService.faq.findUnique({
      where: {
        id,
      },
    });

    if (!faq) {
      throw new NotFoundException('Вопрос не найден');
    }

    return this.prismaService.faq.delete({
      where: {
        id,
      },
    });
  }
}
