import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите имя' })
  name: string;

  @IsInt({ message: 'Оценка должна быть числом' })
  @Min(1, { message: 'Минимальная оценка — 1' })
  @Max(5, { message: 'Максимальная оценка — 5' })
  rating: number;

  @IsString()
  @IsNotEmpty({ message: 'Напишите текст отзыва' })
  text: string;
}
