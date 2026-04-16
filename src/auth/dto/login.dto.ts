import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Укажите email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите пароль' })
  password: string;
}
