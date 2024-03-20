import { Categoria } from '../../categorias/entities/categoria.entity';

export class OneSubcategoryDto {
  id: string;
  name: string;
  categoria: Categoria;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
