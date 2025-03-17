import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from '@/models/category.model';
import { Product } from '@/models/product.model';
import {
  GET_ALL_CATEGORIES,
  GET_CATEGORY_BY_SLUG,
  GET_PRODUCT_BY_SLUG,
  GET_RELATED_PRODUCTS
} from '@/core/graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  getAllCategories(): Observable<Category[]> {
    return this.apollo.query<{ categories: Category[] }>({
      query: GET_ALL_CATEGORIES
    }).pipe(
      map(result => result.data.categories),
      catchError(error => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('Failed to fetch categories'));
      })
    );
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    return this.apollo.query<{ category: Category }>({
      query: GET_CATEGORY_BY_SLUG,
      variables: { slug }
    }).pipe(
      map(result => result.data.category),
      catchError(error => {
        console.error(`Error fetching category ${slug}:`, error);
        return throwError(() => new Error(`Failed to fetch category: ${slug}`));
      })
    );
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.apollo.query<{ product: Product }>({
      query: GET_PRODUCT_BY_SLUG,
      variables: { slug }
    }).pipe(
      map(result => result.data.product),
      catchError(error => {
        console.error(`Error fetching product ${slug}:`, error);
        return throwError(() => new Error(`Failed to fetch product: ${slug}`));
      })
    );
  }

  getRelatedProducts(categorySlug: string, currentProductSlug: string): Observable<Product[]> {
    return this.apollo.query<{ products: Product[] }>({
      query: GET_RELATED_PRODUCTS,
      variables: { categorySlug, currentProductSlug }
    }).pipe(
      map(result => result.data.products),
      catchError(error => {
        console.error(`Error fetching related products:`, error);
        return throwError(() => new Error('Failed to fetch related products'));
      })
    );
  }
}
