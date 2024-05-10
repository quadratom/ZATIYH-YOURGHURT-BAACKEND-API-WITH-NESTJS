import { PartialType } from '@nestjs/swagger';
import { CreateZohoDto } from './create-zoho.dto';

export class UpdateZohoDto extends PartialType(CreateZohoDto) {}
