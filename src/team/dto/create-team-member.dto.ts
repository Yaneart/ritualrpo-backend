import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите имя' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите должность' })
  position: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите фото' })
  photo: string;

  @IsInt({ message: 'Порядок должен быть числом' })
  @Min(0, { message: 'Порядок не может быть отрицательным' })
  @IsOptional()
  order?: number;
}
