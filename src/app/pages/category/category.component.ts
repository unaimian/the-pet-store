import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Category } from '@/models/category.model';
import { Product } from '@/models/product.model';
import { CategoryService } from '@/core/services/category.service';
import { ProductService } from '@/core/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category$!: Observable<Category>;
  products$!: Observable<Product[]>;
  loading = true; // Start with loading true

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.category$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug') || '';
        return this.categoryService.getCategoryBySlug(slug);
      })
    );

    this.products$ = this.category$.pipe(
      switchMap(category => {
        return this.productService.getProductsByCategory(category.slug);
      })
    );

    combineLatest([this.category$, this.products$]).pipe(
      tap(() => {
        this.loading = false;
      })
    ).subscribe();
  }

  goToProductPage(slug: string): void {
    this.router.navigate(['/product', slug]);
  }
}
