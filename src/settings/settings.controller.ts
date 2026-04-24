import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':key')
  upsert(@Param('key') key: string, @Body() dto: UpdateSettingDto) {
    return this.settingsService.upsert(key, dto);
  }
}
