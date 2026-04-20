import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdvantagesService } from './advantages.service';
import { CreateAdvantageDto } from './dto/create-advantage.dto';
import { UpdateAdvantageDto } from './dto/update-advantage.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('advantages')
export class AdvantagesController {
  constructor(private readonly advantagesService: AdvantagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdvantageDto: CreateAdvantageDto) {
    return this.advantagesService.create(createAdvantageDto);
  }

  @Get()
  findAll() {
    return this.advantagesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdvantageDto: UpdateAdvantageDto,
  ) {
    return this.advantagesService.update(id, updateAdvantageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advantagesService.remove(id);
  }
}
