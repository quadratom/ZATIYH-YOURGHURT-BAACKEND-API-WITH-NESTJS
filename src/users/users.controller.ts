import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { validateEmail, validateNigerianPhoneNumber } from 'src/utils';
import { throwBadRequest } from 'src/utils/exceptions';
import { VerifyUserDto } from './dto/verify-user.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const isEmail = validateEmail(createUserDto.email);
    const isPhoneNumber = validateNigerianPhoneNumber(
      createUserDto.phoneNumber,
    );
    if (!isEmail) {
      return throwBadRequest('Invalid email address');
    }
    if (!isPhoneNumber) {
      return throwBadRequest('Invalid phone number');
    }

    return this.usersService.create(createUserDto);
  }

  @Post('/verifyUser')
  async verifyUser(@Body() verifyUserDto: VerifyUserDto) {
    return await this.usersService.verifyUser(verifyUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':phoneNumber')
  async findOneByNumber(@Param('phoneNumber') phoneNumber: string) {
    let newPhoneNumber: string;

    if (phoneNumber.startsWith('0')) {
      newPhoneNumber = '234' + phoneNumber.substring(1);
    } else {
      newPhoneNumber = phoneNumber;
    }
    return this.usersService.findUser(newPhoneNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
