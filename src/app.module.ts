import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ServicesModule } from './services/services.module';
import { ProductsModule } from './products/products.module';
import { RequestsModule } from './requests/requests.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PrismaModule, ServicesModule, ProductsModule, RequestsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
