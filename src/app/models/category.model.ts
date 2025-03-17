import { Product } from './product.model';

export interface Category {
  slug: string;
  name: string;
  image?: {
    url: string;
  };
  products?: Product[];
}
