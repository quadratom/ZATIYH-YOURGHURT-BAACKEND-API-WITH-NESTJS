import { Test, TestingModule } from '@nestjs/testing';
import { ZohoController } from './zoho.controller';
import { ZohoService } from './zoho.service';

describe('ZohoController', () => {
  let controller: ZohoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZohoController],
      providers: [ZohoService],
    }).compile();

    controller = module.get<ZohoController>(ZohoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
