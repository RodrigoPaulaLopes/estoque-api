import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categorias/entities/categoria.entity';
import { CategoriasModule } from './categorias/categorias.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { Subcategory } from './subcategory/entities/subcategory.entity';
import { ProdutosModule } from './produtos/produtos.module';
import { Produto } from './produtos/entities/produto.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [Categoria, Subcategory, Produto],
    }),
    CategoriasModule,
    SubcategoryModule,
    ProdutosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
