import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { AddQuantityProdutoDto } from './dto/add-quantity-produto.dto';
import { RemoveQuantityProdutoDto } from './dto/remove-quantity-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Put('/add')
  add_quantity_product(@Body() addQuantityProdutoDto: AddQuantityProdutoDto) {
    return this.produtosService.add_quantities(addQuantityProdutoDto);
  }
  @Delete('/remove')
  remove_quantity_product(
    @Body() removeQuantityProdutoDto: RemoveQuantityProdutoDto,
  ) {
    return this.produtosService.remove_quantities(removeQuantityProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }

  @Delete('/inative/:id')
  inative(@Param('id') id: string) {
    return this.produtosService.inative(id);
  }
}
