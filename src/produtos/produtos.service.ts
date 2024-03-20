import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { AddQuantityProdutoDto } from './dto/add-quantity-produto.dto';
import { RemoveQuantityProdutoDto } from './dto/remove-quantity-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    private readonly subcategoryService: SubcategoryService,
  ) {}
  async create(createProdutoDto: CreateProdutoDto) {
    await this.verifyIfProductAlreadyExists(createProdutoDto.name);

    const subcategory =
      await this.subcategoryService.verifyIfSubCategoryNotExists(
        createProdutoDto.subcategoryId,
      );

    const produto: Produto = {
      ...createProdutoDto,
      subcategory: subcategory,
    };

    return await this.produtoRepository.save(produto);
  }
  async remove_quantities(addQuantityProdutoDto: AddQuantityProdutoDto) {
    await this.verifyIfProducNotExists(addQuantityProdutoDto.id);

    if (addQuantityProdutoDto.quantities < 1)
      throw new BadRequestException('The quantities cannot be minus than 1.');

    const quantity = (
      await this.produtoRepository.findOne({
        where: { id: addQuantityProdutoDto.id },
      })
    ).quantities;

    if (addQuantityProdutoDto.quantities > quantity)
      throw new BadRequestException(
        'The quantities is more than the product quantity',
      );
    return await this.produtoRepository.update(addQuantityProdutoDto.id, {
      quantities: addQuantityProdutoDto.quantities - quantity,
    });
  }

  async add_quantities(removeQuantityProductDto: RemoveQuantityProdutoDto) {
    await this.verifyIfProducNotExists(removeQuantityProductDto.id);

    if (removeQuantityProductDto.quantities < 1)
      throw new BadRequestException('The quantities cannot be minus than 1.');

    const quantity = (
      await this.produtoRepository.findOne({
        where: { id: removeQuantityProductDto.id },
      })
    ).quantities;
    return await this.produtoRepository.update(removeQuantityProductDto.id, {
      quantities: quantity + removeQuantityProductDto.quantities,
    });
  }

  async verifyIfProductAlreadyExists(product_name: string) {
    if (await this.produtoRepository.findOne({ where: { name: product_name } }))
      throw new BadRequestException('Product already exists!');
  }

  async verifyIfProducNotExists(product_id: string) {
    const product = await this.produtoRepository.findOne({
      where: { id: product_id },
      relations: ['subcategory'],
    });
    if (!product) throw new NotFoundException('Product not exists!');

    return product;
  }

  async findAll() {
    return await this.produtoRepository.find({
      where: { is_active: true },
      relations: ['subcategory'],
    });
  }

  async findOne(id: string) {
    return await this.verifyIfProducNotExists(id);
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    await this.verifyIfProducNotExists(id);

    const sub = await this.subcategoryService.findOne(
      updateProdutoDto.subcategoryId,
    );

    if (updateProdutoDto.quantities < 1)
      throw new BadRequestException('The quantities cannot be minus than 1.');
    const product: Produto = {
      name: updateProdutoDto.name,
      description: updateProdutoDto.description,
      color: updateProdutoDto.color,
      photo: updateProdutoDto.photo,
      price: updateProdutoDto.price,
      quantities: updateProdutoDto.quantities,
      size: updateProdutoDto.size,
      is_active: true,
      subcategory: sub,
    };

    return await this.produtoRepository.update(id, product);
  }

  async remove(id: string) {
    await this.verifyIfProducNotExists(id);

    return await this.produtoRepository.delete(id);
  }

  async inative(id: string) {
    await this.verifyIfProducNotExists(id);
    return await this.produtoRepository.update(id, { is_active: false });
  }
}
