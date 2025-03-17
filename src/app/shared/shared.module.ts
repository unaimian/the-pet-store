import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from '@/components/cart/cart.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductCardComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CartComponent
  ]
})

export class SharedModule {}
