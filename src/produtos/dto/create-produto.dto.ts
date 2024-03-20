import { IsBoolean, IsCurrency, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsCurrency({
    allow_decimal: true,
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: '.',
    thousands_separator: ',',
  })
  @IsNotEmpty()
  price: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  quantities: number;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  photo: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @IsNotEmpty()
  subcategoryId: string;
}
