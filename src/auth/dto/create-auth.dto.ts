import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Gender {
  Male,
  Female,
}

export class CreateAuthDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Firstname should not be empty' })
  @IsString({ message: 'First name should be string' })
  firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @IsString({ message: 'Last name should be string' })
  @IsNotEmpty({ message: 'Last name should not be empty' })
  lastName: string;

  @ApiProperty()
  @IsString({ message: 'Username should be string' })
  @IsNotEmpty({ message: 'Username should not be empty' })
  username: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Please provide valid email', always: true })
  email: string;

  @ApiProperty({
    description: 'Date is like 2020-11-22',
    example: '2010-10-27',
  })
  @IsNotEmpty({ message: 'Date should not be empty' })
  dob: Date;

  @ApiProperty({
    enum: Gender,
    description: 'MALE or FEMALE',
    example: 'MALE or FEMALE',
  })
  @IsEnum(Gender, { message: 'Gender should be Male or Female' })
  gender: Gender;

  @ApiProperty()
  @IsString({ message: 'Password must be a styring' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @ApiProperty()
  @IsString({ message: 'ConfirmPassword must be a styring' })
  @IsNotEmpty({ message: 'ConfirmPassword should not be empty' })
  confirmPassword: string;
}
