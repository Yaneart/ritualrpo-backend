import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateServiceTypeDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите slug' })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите название' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите описание' })
  description: string;

  @IsInt({ message: 'Базовая цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  basePrice: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}
