import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  category: string;
  subcategory: string;
  tagcategory: string;
  colors: string;
  sizes: string;
}
