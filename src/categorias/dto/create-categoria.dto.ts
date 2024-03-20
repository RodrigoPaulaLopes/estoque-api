import { IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'O nome da categoria não deve ser vazio ou nullo' })
  name: string;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
