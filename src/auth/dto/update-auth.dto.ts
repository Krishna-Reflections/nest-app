import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  Male,
  Female,
}

export class UpdateAuthDto {
  @ApiProperty({ enum: Gender, example: 'Male or Female' })
  @IsEnum(Gender, { message: 'Gender should be (Male / Female)' })
  gender: Gender;
}
