import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createReviewDto: CreateReviewDto) {
    return this.prismaService.review.create({
      data: createReviewDto,
    });
  }

  findAllPublic(limit?: number) {
    return this.prismaService.review.findMany({
      where: {
        isApproved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  findAllAdmin() {
    return this.prismaService.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async approve(id: string) {
    const review = await this.prismaService.review.findUnique({
      where: {
        id,
      },
    });

    if (!review) {
      throw new NotFoundException('отзыв не найден');
    }

    return this.prismaService.review.update({
      where: {
        id,
      },
      data: {
        isApproved: true,
      },
    });
  }

  async remove(id: string) {
    const review = await this.prismaService.review.findUnique({
      where: {
        id,
      },
    });

    if (!review) {
      throw new NotFoundException('отзыв не найден');
    }

    return this.prismaService.review.delete({
      where: {
        id,
      },
    });
  }
}
