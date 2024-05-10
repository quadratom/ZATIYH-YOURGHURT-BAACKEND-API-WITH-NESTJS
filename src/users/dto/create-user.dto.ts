import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // @ApiProperty({ description: 'The username of the user' })
  // username: string;

  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'The full name of the user' })
  firstName: string;

  @ApiProperty({ description: 'The full name of the user' })
  lastName: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsNotEmpty()
  phoneNumber: string;
}
