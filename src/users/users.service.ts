/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, User, UserDocument } from 'schema/user.schema';
import { generateOTP, validateEmail } from 'src/utils';
import { throwBadRequest, throwGatewayError, throwNotFoundError } from 'src/utils/exceptions';
import { TextMessageService } from 'src/text-message/text-message.service';
import { VerifyUserDto } from './dto/verify-user.dto';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/utils/config';

@Injectable()  
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
    private textMessageService: TextMessageService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const otp = generateOTP();
    let phoneNumber: string;

    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const emailExist = await this.userModel.findOne({
      email: createUserDto.email,
    });

    console.log({ emailExist })
    
    if (emailExist && emailExist.verified) {
      return throwBadRequest('Email already exist');
    }

    const phoneNumberExist = await this.userModel.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (phoneNumberExist && phoneNumberExist.verified) {
      return throwBadRequest('Phonenumber already exist');
    }

    if (createUserDto.phoneNumber.startsWith("0")) {
      phoneNumber = "234" + createUserDto.phoneNumber.substring(1);
    } else {
      phoneNumber = createUserDto.phoneNumber
    }

    const newUserDetails = {
      ...createUserDto,
      role: Roles.CUSTOMER,
      phoneNumber,
      otp,
      firstName: createUserDto.firstName.toLowerCase(),
      lastName: createUserDto.lastName.toLowerCase(),
      password: hashPassword,
    }

    await this.textMessageService.sendSmsWithSendChamp({
      message: `Hi ${createUserDto.firstName}, Your One-Time Password (OTP) for verification is ${otp}. Please enter this code to proceed. Do not share this OTP with anyone. Thank you.`,
      receiver: createUserDto.phoneNumber
    })

    //TODO PASSWORD HASHING

    if (phoneNumberExist || emailExist) {
      const phoneNumber = phoneNumberExist?.phoneNumber || emailExist?.phoneNumber

      return await this.updateUser(phoneNumber, newUserDetails)
    }

    const newUser = await this.userModel.create(newUserDetails);
    return newUser;
  }


  async updateUser(identifier: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { $or: [{ username: identifier }, { phoneNumber: identifier }] },
      updateData,
      { new: true }
    );

    if (!user) {
      return throwNotFoundError('User not found');
    }

    return user;
  }

  async findUser(identifier: string): Promise<User> {

    const user = await this.userModel.findOne(
      { 
        $and: [
          { $or: [{ username: identifier }, { phoneNumber: identifier }] },
          { verified: true }
        ]
      });

    if (!user) {
      return throwBadRequest('User not found');
    }

    return user;
  }

  async verifyUser(verifyUserDto: VerifyUserDto) {
    const { otp } = verifyUserDto
    let phoneNumber: string;
    console.log(
      { verifyUserDto }
    )

    if (verifyUserDto.phoneNumber.startsWith("0")) {
      phoneNumber = "234" + verifyUserDto.phoneNumber.substring(1);
    } else {
      phoneNumber = verifyUserDto.phoneNumber
    }

    const user = await  this.userModel.findOne({ phoneNumber });

    if(!user) {
      return throwNotFoundError('user not found')
    }

    if(user.verified){
      return throwBadRequest("Account has already been verified")
    }

    if(otp !== user.otp){
      return throwGatewayError('Invalid otp')
    }

    const updatedUser = await this.userModel.findOneAndUpdate({ phoneNumber }, {verified: true, mobileVerified: true}, { new: true });

    return updatedUser
  }

  async findAll() {
    return await this.userModel.find({ verified: true });
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
