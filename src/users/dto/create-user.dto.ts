import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @ApiProperty({ description: 'The full name of the user' })
  fullname: string;

  @ApiProperty({ description: 'The date of birth of the user' })
  dateOfBirth: Date;

  @ApiProperty({ description: 'The address of the user' })
  address: string;

  @ApiProperty({ description: 'The phone number of the user' })
  phoneNumber: string;


}
