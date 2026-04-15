export class CreateServiceDto {
  slug: string;
  title: string;
  description: string;
  fullText: string;
  image: string;
  price?: string;
  order?: number;
  isActive?: boolean;
}
