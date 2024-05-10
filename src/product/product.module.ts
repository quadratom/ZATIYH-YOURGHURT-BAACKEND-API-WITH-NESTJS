import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ZohoModule } from 'src/zoho/zoho.module';
import { ZohoService } from 'src/zoho/zoho.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ZohoModule, ConfigModule.forRoot()],
  controllers: [ProductController],
  providers: [ProductService, ZohoService],
})
export class ProductModule {}
