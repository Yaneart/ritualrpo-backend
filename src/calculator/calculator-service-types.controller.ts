import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CalculatorServiceTypesService } from './calculator-service-types.service';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('calculator/service-types')
export class CalculatorServiceTypesController {
  constructor(
    private readonly serviceTypesService: CalculatorServiceTypesService,
  ) {}

  @Get()
  findAll() {
    return this.serviceTypesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateServiceTypeDto) {
    return this.serviceTypesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceTypeDto) {
    return this.serviceTypesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceTypesService.remove(id);
  }
}
