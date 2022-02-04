import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Please use email / username to login' })
  email?: string;
  @ApiProperty()
  @MinLength(8, { message: 'Password min length is 8' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
