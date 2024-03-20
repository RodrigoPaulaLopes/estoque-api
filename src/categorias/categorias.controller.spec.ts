import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

describe('CategoriasController', () => {
  let controller: CategoriasController;
  let service: CategoriasService;
  const listOfCategories = [
    {
      id: '9a7015c0-b57c-4709-a8aa-5af0fff10b64',
      name: 'Roupas',
      is_active: true,
      createdAt: '2024-03-16T16:23:48.676Z',
      updatedAt: '2024-03-16T16:24:42.000Z',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
      providers: [
        {
          provide: CategoriasService,
          useValue: {
            create: jest.fn().mockResolvedValue(listOfCategories[0]),
            findAll: jest.fn().mockResolvedValue(listOfCategories),
            findOne: jest.fn().mockResolvedValue(listOfCategories[0]),
            findByName: jest.fn().mockResolvedValue(listOfCategories[0]),
            update: jest.fn().mockResolvedValue(listOfCategories[0]),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriasController>(CategoriasController);
    service = module.get<CategoriasService>(CategoriasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('POST /categorias', async () => {
      const data: CreateCategoriaDto = { name: 'Roupas' };
      const result = await controller.create(data);

      expect(result).toEqual(listOfCategories[0]);
    });
  });
  describe('Read', () => {
    it('GET /categorias', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(listOfCategories);
    });

    it('GET /categorias/:id', async () => {
      const id = '9a7015c0-b57c-4709-a8aa-5af0fff10b64';
      const result = await controller.findOne(id);

      expect(result).toEqual(listOfCategories[0]);
    });

    it('GET /categorias/:name', async () => {
      const name = 'Roupas';
      const result = await controller.findByName(name);

      expect(result).toEqual(listOfCategories[0]);
    });
  });

  describe('Update', () => {
    it('PUT /categorias/:id', async () => {
      const id = '9a7015c0-b57c-4709-a8aa-5af0fff10b64';
      const data: UpdateCategoriaDto = { id: id, name: 'Roupas' };
      const result = await controller.update(id, data);

      expect(result).toEqual(listOfCategories[0]);
    });
  });

  describe('Delete', () => {
    it('DELETE /categorias/:id', async () => {
      const id = '9a7015c0-b57c-4709-a8aa-5af0fff10b64';

      const result = await controller.remove(id);

      expect(result).toEqual({ deleted: true });
    });
  });
});
