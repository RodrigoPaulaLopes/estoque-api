import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,

    private readonly categoriaService: CategoriasService,
  ) {}
  async create(createSubcategoryDto: CreateSubcategoryDto) {
    await this.verifyIfSubCategoryAlreadyExists(createSubcategoryDto.name);

    const category: Categoria = await this.categoriaService.findOne(
      createSubcategoryDto.categoryId,
    );

    const subcategory: Subcategory = {
      ...createSubcategoryDto,
      category: category,
    };
    return await this.subcategoryRepository.save(subcategory);
  }
  async verifyIfSubCategoryAlreadyExists(sub_category_name: string) {
    if (
      await this.subcategoryRepository.findOne({
        where: { name: sub_category_name },
      })
    ) {
      throw new BadRequestException('Sub category already exists');
    }
  }

  async verifyIfSubCategoryNotExists(id: string) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: id },
    });
    if (!subcategory) throw new NotFoundException('Sub category not found.');

    return subcategory;
  }
  async verifyIfSubCategoryNotExistsByName(name: string) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { name: name },
    });
    if (!subcategory) throw new NotFoundException('Sub category not found.');

    return subcategory;
  }
  async findAll() {
    return await this.subcategoryRepository.find();
  }

  async findOne(id: string) {
    await this.verifyIfSubCategoryNotExists(id);
    return await this.subcategoryRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    await this.verifyIfSubCategoryNotExists(id);
    const category = await this.categoriaService.findOne(
      updateSubcategoryDto.categoryId,
    );
    const updateSub: Subcategory = {
      name: updateSubcategoryDto.name,
      is_active: true,
      category: category,
    };
    const updated = await this.subcategoryRepository.update(id, updateSub);

    return updated;
  }

  async remove(id: string) {
    if (!(await this.subcategoryRepository.findOne({ where: { id: id } })))
      throw new NotFoundException('Sub category not found!');

    try {
      return await this.subcategoryRepository.delete(id);
    } catch (error) {
      throw new UnauthorizedException(
        'You cannot remove this entity because its has another enitys associated.',
      );
    }
  }
}
