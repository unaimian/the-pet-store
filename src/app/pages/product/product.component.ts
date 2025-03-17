import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, catchError, of, switchMap, takeUntil, tap } from 'rxjs';
import { Product } from '@/models/product.model';
import { ProductService } from '@/core/services/product.service';
import { CountdownService } from '@/core/services/countdown.service';
import { CartService } from '@/core/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product$!: Observable<Product>;
  relatedProducts$!: Observable<Product[]>;
  countdown$!: Observable<{hours: number, minutes: number, seconds: number}>;
  loading = false;


  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private countdownService: CountdownService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.initCountdown();
    this.loadProductData();
  }

  private initCountdown(): void {
    this.countdown$ = this.countdownService.countdownToMidnight();
  }

  private loadProductData(): void {
    this.loading = true;

    this.product$ = this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const slug = params.get('slug') || '';
        return this.productService.getProductBySlug(slug).pipe(
          catchError(error => {
            console.error('Error loading product:', error);
            return of({} as Product);
          })
        );
      }),
      tap(product => {
        this.loading = false;

        if (product?.category) {
          this.loadRelatedProducts(product);
        }
      })
    );

    this.product$.subscribe();
  }

  private loadRelatedProducts(product: Product): void {
    if (!product?.category?.slug || !product.slug) return;

    this.relatedProducts$ = this.productService.getRelatedProducts(
      product.category.slug,
      product.slug
    ).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Error loading related products:', error);
        return of([]);
      })
    );
  }

  addToCart(product: Product): void {
    if (!product) return;

    this.cartService.addToCart(product);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
