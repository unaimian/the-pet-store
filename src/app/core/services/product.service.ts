import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '@/models/product.model';
import { GraphQLService } from './graphql.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private graphQLService: GraphQLService) {}

  getProductBySlug(slug: string): Observable<Product> {
    return this.graphQLService.getProductBySlug(slug);
  }

  getProductsByCategory(categorySlug: string): Observable<Product[]> {
    return this.graphQLService.getCategoryBySlug(categorySlug).pipe(
      map(category => category?.products || [])
    );
  }

  getRelatedProducts(categorySlug: string, currentProductSlug: string): Observable<Product[]> {
    return this.graphQLService.getRelatedProducts(categorySlug, currentProductSlug);
  }
}
