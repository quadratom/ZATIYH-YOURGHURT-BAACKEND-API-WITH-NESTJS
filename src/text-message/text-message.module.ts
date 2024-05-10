import { Module } from '@nestjs/common';
import { TextMessageService } from './text-message.service';
import { TextMessageController } from './text-message.controller'; 
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TextMessageController],
  providers: [TextMessageService],
  exports: [TextMessageService],
})
export class TextMessageModule {}
