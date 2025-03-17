import { Category } from './category.model';

export interface Product {
  description?: string;
  name: string;
  price: number;
  slug: string;
  image: {
    url: string;
  };
  category?: Category;
}
