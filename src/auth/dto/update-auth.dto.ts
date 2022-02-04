import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  Male,
  Female,
}

export class UpdateAuthDto {
  @ApiProperty({ enum: Gender, example: 'MALE or FEMALE' })
  @IsEnum(Gender, { message: 'Gender(MALE/FEMALE) should not be empty ' })
  gender: Gender;
}
