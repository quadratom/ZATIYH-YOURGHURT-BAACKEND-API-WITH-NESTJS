import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { comparePassword, screenFields, toJSON } from './utils';

export type UserDocument = User & Document;

export enum Roles {
  CUSTOMER = 'Customer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

class Image {
  @Prop()
  asset_id: string;

  @Prop()
  public_id: string;

  @Prop()
  version_id: string;

  @Prop()
  signature: string;

  @Prop()
  format: string;

  @Prop()
  resource_type: string;

  @Prop()
  url: string;

  @Prop()
  secure_url: string;

  @Prop()
  folder: string;

  @Prop()
  access_mode: string;

  @Prop()
  original_filename: string;
}

class Address {
  @Prop()
  address: string;

  @Prop()
  zipCode: string;

  @Prop()
  city: string;
}

@Schema({ timestamps: true })
class User {
  [x: string]: any;
  @Prop({ index: 'text' })
  firstName: string;

  @Prop({ index: 'text' })
  lastName: string;

  @Prop({})
  bio: string;

  @Prop()
  profilePicture: Image;

  @Prop()
  profileBanner: Image;

  @Prop({ required: true, unique: true, index: 'text' })
  phoneNumber: string;

  @Prop({ unique: true, index: 'text' })
  email: string; 

  @Prop()
  dateOfBirth: string;

  @Prop()
  country: string;

  @Prop()
  verified: boolean;

  @Prop()
  mobileVerified: boolean;

  @Prop()
  walletId: string;

  @Prop()
  gender: string;

  @Prop()
  address: Address;

  @Prop()
  password: string;

  @Prop()
  otp: string;

  @Prop()
  isOnline: boolean;

  @Prop({ enum: Roles, required: true, type: String })
  role: Roles;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = comparePassword;

UserSchema.methods.toJSON = toJSON;

UserSchema.methods.screenFields = screenFields;

export interface UserWithMethods extends User {
  comparePassword: typeof screenFields;
  screenFields: typeof screenFields;
}

export { UserSchema, User };
