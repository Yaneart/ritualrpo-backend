import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createRequestDto: CreateRequestDto) {
    return this.prismaService.request.create({
      data: createRequestDto,
    });
  }

  findAll() {
    return this.prismaService.request.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.request.findUnique({
      where: {
        id,
      },
    });
  }

  markAsRead(id: string) {
    return this.prismaService.request.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }

  update(id: string, updateRequestDto: UpdateRequestDto) {
    return this.prismaService.request.update({
      where: {
        id,
      },
      data: updateRequestDto,
    });
  }

  remove(id: string) {
    return this.prismaService.request.delete({
      where: {
        id,
      },
    });
  }
}
