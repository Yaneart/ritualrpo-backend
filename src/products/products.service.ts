import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prismaService.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  findByCategory(categorySlug: string) {
    return this.prismaService.product.findMany({
      where: {
        isActive: true,
        category: { slug: categorySlug },
      },
      include: { category: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  findBySlug(slug: string) {
    return this.prismaService.product.findUnique({
      where: { slug },
      include: { category: true },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
