/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, User, UserDocument } from 'schema/user.schema';
import { generateOTP, validateEmail } from 'src/utils';
import { throwBadRequest } from 'src/utils/exceptions';
import { TextMessageService } from 'src/text-message/text-message.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
    private textMessageService: TextMessageService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const otp = generateOTP();

    console.log({ otp });

    const emailExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (emailExist) {
      return throwBadRequest('Email already exist');
    }

    const phoneNumberExist = await this.userModel.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (phoneNumberExist) {
      return throwBadRequest('Phonenumber already exist');
    }

    await this.textMessageService.sendSmsWithSendChamp({
      message: `Hi ${createUserDto.firstName}, Your One-Time Password (OTP) for verification is ${otp}. Please enter this code to proceed. Do not share this OTP with anyone. Thank you.`,
      receiver: createUserDto.phoneNumber
    })

    const newUser = await this.userModel.create({
      ...createUserDto,
      role: Roles.CUSTOMER,
      otp,
    });

    return newUser;
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  // remove(id: string) {
  //   return this.userModel.deleteOne({ _id: id });
  // }
}
