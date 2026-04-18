import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите slug' })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите название' })
  title: string;

  @IsIn(['required', 'extra'], {
    message: 'type должен быть "required" или "extra"',
  })
  type: 'required' | 'extra';

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}
