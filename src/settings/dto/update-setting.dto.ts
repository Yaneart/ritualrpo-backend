import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите значение' })
  value: string;
}
