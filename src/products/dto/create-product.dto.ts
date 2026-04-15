export class CreateProductDto {
  slug: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  categoryId: string;
  isActive?: boolean;
}
