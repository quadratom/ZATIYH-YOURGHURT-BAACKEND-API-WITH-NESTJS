import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { dbConfig } from './config';
import { ZohoService } from './zoho/zoho.service';

@Module({
  imports: [ UsersModule, MongooseModule.forRoot(dbConfig.db)],
  controllers: [AppController],
  providers: [AppService, ZohoService],
})
export class AppModule {}

