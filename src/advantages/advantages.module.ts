import { Module } from '@nestjs/common';
import { AdvantagesService } from './advantages.service';
import { AdvantagesController } from './advantages.controller';

@Module({
  controllers: [AdvantagesController],
  providers: [AdvantagesService],
})
export class AdvantagesModule {}
