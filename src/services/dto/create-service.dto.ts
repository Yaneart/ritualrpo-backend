import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите slug' })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите навазние услуги' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите описание ' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите полный текст' })
  fullText: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите изображение' })
  image: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsString()
  @IsOptional()
  price?: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
