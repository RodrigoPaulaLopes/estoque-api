import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AddQuantityProdutoDto } from './add-quantity-produto.dto';

export class RemoveQuantityProdutoDto extends PartialType(
  AddQuantityProdutoDto,
) {
  @IsNotEmpty()
  id: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  quantities: number;
}
