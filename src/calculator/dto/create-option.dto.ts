import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите slug' })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите название' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt({ message: 'Цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  price: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @IsUUID('4', { message: 'groupId должен быть UUID' })
  groupId: string;
}
