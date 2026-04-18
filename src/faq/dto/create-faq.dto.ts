import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите вопрос' })
  question: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите ответ' })
  answer: string;

  @IsInt({ message: 'Порядок должен быть числом' })
  @Min(0, { message: 'Порядок не может быть отрицательным' })
  @IsOptional()
  order?: number;
}
