import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddQuantityProdutoDto {
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
