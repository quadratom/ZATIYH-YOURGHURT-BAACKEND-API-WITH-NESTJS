import { Injectable } from '@nestjs/common';
import { CreateZohoDto } from './dto/create-zoho.dto';
import { UpdateZohoDto } from './dto/update-zoho.dto';

@Injectable()
export class ZohoService {
  create(createZohoDto: CreateZohoDto) {
    return 'This action adds a new zoho';
  }

  findAll() {
    return `This action returns all zoho`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zoho`;
  }

  update(id: number, updateZohoDto: UpdateZohoDto) {
    return `This action updates a #${id} zoho`;
  }

  remove(id: number) {
    return `This action removes a #${id} zoho`;
  }
}
