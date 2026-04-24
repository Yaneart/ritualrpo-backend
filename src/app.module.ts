import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ServicesModule } from './services/services.module';
import { ProductsModule } from './products/products.module';
import { RequestsModule } from './requests/requests.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewsModule } from './reviews/reviews.module';
import { FaqModule } from './faq/faq.module';
import { CalculatorModule } from './calculator/calculator.module';
import { StatsModule } from './stats/stats.module';
import { TeamModule } from './team/team.module';
import { AdvantagesModule } from './advantages/advantages.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ServicesModule,
    ProductsModule,
    RequestsModule,
    CategoriesModule,
    AuthModule,
    ReviewsModule,
    FaqModule,
    CalculatorModule,
    StatsModule,
    TeamModule,
    AdvantagesModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
