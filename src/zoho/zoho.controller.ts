import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZohoService } from './zoho.service';
import { CreateZohoDto } from './dto/create-zoho.dto';
import { UpdateZohoDto } from './dto/update-zoho.dto';

@Controller('zoho')
export class ZohoController {
  constructor(private readonly zohoService: ZohoService) {}

  @Post()
  create(@Body() createZohoDto: CreateZohoDto) {
    return this.zohoService.create(createZohoDto);
  }

  @Get()
  findAll() {
    return this.zohoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zohoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZohoDto: UpdateZohoDto) {
    return this.zohoService.update(+id, updateZohoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zohoService.remove(+id);
  }
}
