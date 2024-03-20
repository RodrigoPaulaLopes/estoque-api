import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Subcategory } from '../subcategory/entities/subcategory.entity';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto, Subcategory]),
    SubcategoryModule,
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}
