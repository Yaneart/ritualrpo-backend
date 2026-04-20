import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTeamMemberDto: CreateTeamMemberDto) {
    return this.prismaService.teamMember.create({
      data: createTeamMemberDto,
    });
  }

  findAll() {
    return this.prismaService.teamMember.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async update(id: string, updateTeamMemberDto: UpdateTeamMemberDto) {
    const member = await this.prismaService.teamMember.findUnique({
      where: {
        id,
      },
    });

    if (!member) {
      throw new NotFoundException('Сотрудник не найден');
    }

    return this.prismaService.teamMember.update({
      where: {
        id,
      },
      data: updateTeamMemberDto,
    });
  }

  async remove(id: string) {
    const member = await this.prismaService.teamMember.findUnique({
      where: {
        id,
      },
    });

    if (!member) {
      throw new NotFoundException('Сотрудник не найден');
    }

    return this.prismaService.teamMember.delete({
      where: {
        id,
      },
    });
  }
}
