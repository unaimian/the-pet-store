import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '@/core/services/cart.service';
import { CartItem } from '@/core/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CurrencyPipe]
})
export class CartComponent implements OnInit {
  isCartOpen = false;
  cart$!: Observable<CartItem[]>;

  @ViewChild('cartDropdown') cartDropdown!: ElementRef;
  @ViewChild('cartButton') cartButton!: ElementRef;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isCartOpen) {
      const cartElement = this.cartDropdown?.nativeElement;
      const cartButtonElement = this.cartButton?.nativeElement;

      const clickedInside = cartElement?.contains(event.target) || cartButtonElement?.contains(event.target);

      if (!clickedInside) {
        this.isCartOpen = false;
      }
    }
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  getCartItemCount(): number {
    return this.cartService.getCartItemCount();
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }
}
