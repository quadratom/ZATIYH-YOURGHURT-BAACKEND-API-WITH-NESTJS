import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{name: "users", schema :UsersSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
