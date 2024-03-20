import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    await this.verifyIfCategoryAlreadyExists(createCategoriaDto.name);
    return await this.categoriasRepository.save(createCategoriaDto);
  }

  async verifyIfCategoryNotExistsByName(category_name: string) {
    const category = await this.categoriasRepository.exists({
      where: { name: category_name },
    });
    if (!category) {
      throw new NotFoundException('Category not exists');
    }
    return category;
  }
  async verifyIfCategoryAlreadyExists(category_name: string) {
    if (
      await this.categoriasRepository.exists({
        where: { name: category_name },
      })
    ) {
      throw new BadRequestException('Category already exists');
    }
  }
  async verifyIfCategoryNotExistsById(category_id: string) {
    const category = await this.categoriasRepository.exists({
      where: { id: category_id },
    });
    if (!category) {
      throw new NotFoundException('Category not exists');
    }
    return category;
  }
  async findAll() {
    return await this.categoriasRepository.find();
  }

  async findByName(name: string) {
    const category = await this.categoriasRepository.exists({
      where: { name: name },
    });

    if (!category) throw new NotFoundException('Categori not found.');
    return await this.categoriasRepository.findOne({ where: { name: name } });
  }

  async findOne(id: string) {
    await this.verifyIfCategoryNotExistsById(id);
    return await this.categoriasRepository.findOne({
      where: { id: id },
      relations: ['subcategories'],
    });
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    await this.verifyIfCategoryNotExistsById(id);
    await this.categoriasRepository.update(id, updateCategoriaDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.verifyIfCategoryNotExistsById(id);
    try {
      const category = await this.findOne(id);
      await this.categoriasRepository.remove(category);
      return { deleted: true };
    } catch (error) {
      throw new UnauthorizedException(
        'This category are used by others entities in system, you must delete the others entities.',
      );
    }
  }
}
