import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service';
import { Categoria } from './entities/categoria.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let categoriaRepository: Repository<Categoria>;
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
      providers: [
        CategoriasService,
        {
          provide: getRepositoryToken(Categoria),
          useValue: {
            exists: jest.fn().mockResolvedValue(true),
            save: jest.fn().mockResolvedValue(listOfCategories[0]),
            findOne: jest.fn().mockResolvedValue(listOfCategories[0]),
            find: jest.fn(),
            update: jest.fn().mockResolvedValue(listOfCategories[0]),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
    categoriaRepository = module.get(getRepositoryToken(Categoria));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoriaRepository).toBeDefined();
  });

  describe('CREATE', () => {
    it('should create a new categorie', async () => {
      const created: CreateCategoriaDto = {
        name: 'Roupas',
      };

      jest.spyOn(categoriaRepository, 'exists').mockResolvedValueOnce(false);
      const result = await service.create(created);

      expect(result).toEqual(listOfCategories[0]);
    });

    it('should return a Bad Request exception', async () => {
      const created: CreateCategoriaDto = {
        name: 'Roupas',
      };

      jest
        .spyOn(service, 'verifyIfCategoryAlreadyExists')
        .mockRejectedValueOnce(
          new BadRequestException('Category already exists'),
        );

      await expect(service.create(created)).rejects.toThrow(
        'Category already exists',
      );
    });
  });
  describe('FIND ONE', () => {
    it('should return one category', async () => {
      const id = '9a7015c0-b57c-4709-a8aa-5af0fff10b64';

      jest.spyOn(categoriaRepository, 'exists').mockResolvedValueOnce(true);
      const result = await service.findOne(id);

      expect(result).toEqual(listOfCategories[0]);
    });

    it('should return a not found error', async () => {
      const id = '9a7015c0-b57c-4709-a8aa-5af0fff10b64';
      jest.spyOn(categoriaRepository, 'exists').mockResolvedValueOnce(false);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });
  describe('FIND BY NAME', () => {
    it('should return one category', async () => {
      const name = 'Roupas';
      jest.spyOn(categoriaRepository, 'exists').mockResolvedValueOnce(true);
      const result = await service.findByName(name);

      expect(result).toEqual(listOfCategories[0]);
    });
    it('should return a not found error', async () => {
      const name = 'Roupas';
      jest.spyOn(categoriaRepository, 'exists').mockResolvedValueOnce(false);

      await expect(service.findByName(name)).rejects.toThrow(NotFoundException);
    });
  });
  describe('FIND ALL', () => {});

  describe('UPDATE', () => {
    it('should update the category', async () => {
      const updated: UpdateCategoriaDto = {
        id: '9a7015c0-b57c-4709-a8aa-5af0fff10b64',
        name: 'Roupas',
        is_active: true,
      };
      const result = await service.update(updated.id, updated);
      expect(result).toEqual(listOfCategories[0]);
    });

    it('should return Bad request when try to update category', async () => {
      const updated: UpdateCategoriaDto = {
        id: '9a7015c0-b57c-4709-a8aa-5af0fff10b64',
        name: 'Roupas',
        is_active: true,
      };
      jest.spyOn(categoriaRepository, 'exists').mockResolvedValueOnce(false);

      await expect(service.update(updated.id, updated)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('DELETE', () => {
    it('should delete the category', async () => {
      const id: string = '9a7015c0-b57c-4709-a8aa-5af0fff10b64';

      const result = await service.remove(id);
      expect(result).toEqual({ deleted: true });
    });

    it('should return Bad request when try to delete category', async () => {
      const id: string = '9a7015c0-b57c-4709-a8aa-5af0fff10b64';

      jest.spyOn(categoriaRepository, 'exists').mockResolvedValueOnce(false);

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });

    it('should return Unauthorized Exception when try to delete category', async () => {
      const id: string = '9a7015c0-b57c-4709-a8aa-5af0fff10b64';
      jest
        .spyOn(categoriaRepository, 'remove')
        .mockRejectedValueOnce(
          new UnauthorizedException(
            'This category are used by others entities in system, you must delete the others entities.',
          ),
        );
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(
          new UnauthorizedException(
            'This category are used by others entities in system, you must delete the others entities.',
          ),
        );

      await expect(service.remove(id)).rejects.toThrow(UnauthorizedException);
      await expect(service.remove(id)).rejects.toThrow(
        'This category are used by others entities in system, you must delete the others entities.',
      );
    });
  });
});
