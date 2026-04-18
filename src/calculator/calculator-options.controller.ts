import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CalculatorOptionsService } from './calculator-options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('calculator/options')
@UseGuards(JwtAuthGuard)
export class CalculatorOptionsController {
  constructor(private readonly optionsService: CalculatorOptionsService) {}

  @Post()
  create(@Body() dto: CreateOptionDto) {
    return this.optionsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOptionDto) {
    return this.optionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionsService.remove(id);
  }
}
