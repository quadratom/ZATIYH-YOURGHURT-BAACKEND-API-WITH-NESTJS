import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
  // @ApiProperty({ description: 'The username of the user' })
  // username: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  otp: string;
}
