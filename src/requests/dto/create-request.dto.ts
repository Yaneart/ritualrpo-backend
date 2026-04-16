import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите тип заявки' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите имя' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите телефон' })
  phone: string;

  @IsEmail({}, { message: 'Некорректный email' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  message?: string;
}
