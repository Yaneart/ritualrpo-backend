import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateAdvantageDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите заголовок' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите описание' })
  description: string;

  @IsInt({ message: 'Порядок должен быть числом' })
  @Min(0, { message: 'Порядок не может быть отрицательным' })
  @IsOptional()
  order?: number;
}
