import { Test, TestingModule } from '@nestjs/testing';
import { TextMessageController } from './text-message.controller';
import { TextMessageService } from './text-message.service';

describe('TextMessageController', () => {
  let controller: TextMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextMessageController],
      providers: [TextMessageService],
    }).compile();

    controller = module.get<TextMessageController>(TextMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
