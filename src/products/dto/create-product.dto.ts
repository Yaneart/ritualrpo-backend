import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите slug' })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите имя' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty({ message: 'Укажите цену' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'Укажите изображение' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите категорию' })
  categoryId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
