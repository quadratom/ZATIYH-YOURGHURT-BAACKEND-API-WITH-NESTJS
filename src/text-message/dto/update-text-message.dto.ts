import { PartialType } from '@nestjs/swagger';
import { CreateTextMessageDto } from './create-text-message.dto';

export class UpdateTextMessageDto extends PartialType(CreateTextMessageDto) {}
