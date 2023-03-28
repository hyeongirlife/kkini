import { Test, TestingModule } from '@nestjs/testing';
import { ReceipeIngredientsController } from './receipe-ingredients.controller';

describe('ReceipeIngredientsController', () => {
  let controller: ReceipeIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceipeIngredientsController],
    }).compile();

    controller = module.get<ReceipeIngredientsController>(ReceipeIngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
