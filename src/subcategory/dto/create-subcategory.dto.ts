import { IsNotEmpty } from 'class-validator';

export class CreateSubcategoryDto {
  @IsNotEmpty({
    message: 'O nome da sub categoria não deve ser vazio ou nullo',
  })
  name: string;
  @IsNotEmpty({
    message: 'O id da categoria deve ser passado',
  })
  categoryId: string;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
