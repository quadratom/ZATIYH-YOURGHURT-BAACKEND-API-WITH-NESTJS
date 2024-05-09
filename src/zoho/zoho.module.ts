import { Module } from '@nestjs/common';
import { ZohoService } from './zoho.service';
import { ZohoController } from './zoho.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ZohoController],
  providers: [ZohoService],
  exports: [ZohoService],
})
export class ZohoModule {}
