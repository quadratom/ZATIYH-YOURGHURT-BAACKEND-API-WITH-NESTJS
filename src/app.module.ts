import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { dbConfig } from './config';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(dbConfig.db)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

