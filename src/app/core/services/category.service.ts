import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '@/models/category.model';
import { GraphQLService } from './graphql.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private graphQLService: GraphQLService) {}

  getAllCategories(): Observable<Category[]> {
    return this.graphQLService.getAllCategories();
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    return this.graphQLService.getCategoryBySlug(slug);
  }
}
