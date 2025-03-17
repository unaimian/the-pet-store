import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '@/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  cartTotal$ = this.cart$.pipe(
    map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
  );

  cartCount$ = this.cart$.pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0))
  );

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        this.cartSubject.next(JSON.parse(savedCart));
      }
    } catch (e) {
      this.cartSubject.next([]);
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cart$;
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce(
      (total, item) => total + (item.product.price * item.quantity), 0
    );
  }

  getCartItemCount(): number {
    return this.cartSubject.value.reduce((count, item) => count + item.quantity, 0);
  }

  addToCart(product: Product, quantity: number = 1): void {
    if (quantity <= 0) return;

    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.product.name === product.name);

    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = currentCart.map(item =>
        item.product.name === product.name
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...currentCart, { product, quantity }];
    }

    this.saveCart(updatedCart);
  }

  removeFromCart(productId: string): void {
    const updatedCart = this.cartSubject.value.filter(
      item => item.product.name !== productId
    );
    this.saveCart(updatedCart);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const updatedCart = this.cartSubject.value.map(item =>
      item.product.name === productId
        ? { ...item, quantity }
        : item
    );

    this.saveCart(updatedCart);
  }

  clearCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY);
    this.cartSubject.next([]);
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }
}
