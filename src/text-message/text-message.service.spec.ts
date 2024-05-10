import { Test, TestingModule } from '@nestjs/testing';
import { TextMessageService } from './text-message.service';

describe('TextMessageService', () => {
  let service: TextMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextMessageService],
    }).compile();

    service = module.get<TextMessageService>(TextMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
