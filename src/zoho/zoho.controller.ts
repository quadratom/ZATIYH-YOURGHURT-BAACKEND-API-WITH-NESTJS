import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZohoService } from './zoho.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Zoho')
@Controller('zoho')
export class ZohoController {
  constructor(private readonly zohoService: ZohoService) { }


  @Get('access-token')
  findOne() {
    return this.zohoService.findOne();
  }
}
