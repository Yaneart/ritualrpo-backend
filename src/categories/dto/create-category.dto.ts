import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите slug' })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите название категории' })
  name: string;

  @IsInt()
  @IsOptional()
  order?: number;
}
