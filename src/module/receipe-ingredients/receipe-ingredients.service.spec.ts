import { Test, TestingModule } from '@nestjs/testing';
import { ReceipeIngredientsService } from './receipe-ingredients.service';

describe('ReceipeIngredientsService', () => {
  let service: ReceipeIngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceipeIngredientsService],
    }).compile();

    service = module.get<ReceipeIngredientsService>(ReceipeIngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
