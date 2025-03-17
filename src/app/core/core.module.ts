import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '@/core/graphql/graphql.module';
import { ProductService } from '@/core/services/product.service';
import { CategoryService } from '@/core/services/category.service';
import { GraphQLService } from '@/core/services/graphql.service';
import { CountdownService } from '@/core/services/countdown.service';
import { CartService } from '@/core/services/cart.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [
    ProductService,
    CategoryService,
    GraphQLService,
    CountdownService,
    CartService
  ],
  exports: [
    GraphQLModule
  ]
})
export class CoreModule { }
