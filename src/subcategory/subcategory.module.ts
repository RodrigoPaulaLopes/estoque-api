import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subcategory, Categoria]),
    CategoriasModule,
  ],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
