import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosService } from './produtos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { SubcategoryService } from 'src/subcategory/subcategory.service';

describe('ProdutosService', () => {
  let service: ProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        SubcategoryService,
        {
          provide: getRepositoryToken(Produto),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
