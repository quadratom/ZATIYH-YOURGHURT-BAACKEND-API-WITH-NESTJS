import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from 'schema/user.schema';
import { TextMessageModule } from 'src/text-message/text-message.module';
import { TextMessageService } from 'src/text-message/text-message.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TextMessageModule,
    ConfigModule.forRoot(),
  ],
  controllers: [UsersController],
  providers: [UsersService, TextMessageService],
})
export class UsersModule { }
