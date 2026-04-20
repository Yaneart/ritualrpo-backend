import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateStatDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите значение' })
  value: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите подпись' })
  label: string;

  @IsInt({ message: 'Порядок должен быть числом' })
  @Min(0, { message: 'Порядок не может быть отрицательным' })
  @IsOptional()
  order?: number;
}
