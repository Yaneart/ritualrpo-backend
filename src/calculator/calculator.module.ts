import { Module } from '@nestjs/common';
import { CalculatorServiceTypesController } from './calculator-service-types.controller';
import { CalculatorServiceTypesService } from './calculator-service-types.service';
import { CalculatorGroupsController } from './calculator-groups.controller';
import { CalculatorGroupsService } from './calculator-groups.service';
import { CalculatorOptionsController } from './calculator-options.controller';
import { CalculatorOptionsService } from './calculator-options.service';

@Module({
  controllers: [
    CalculatorServiceTypesController,
    CalculatorGroupsController,
    CalculatorOptionsController,
  ],
  providers: [
    CalculatorServiceTypesService,
    CalculatorGroupsService,
    CalculatorOptionsService,
  ],
})
export class CalculatorModule {}
