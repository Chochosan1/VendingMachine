import { Injectable } from '@angular/core';
import { HttpService } from '../requests/http.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  inStockAmount: number;
}

/**Provides all necessary data and CRUD operations. */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private products$ = new BehaviorSubject<Product[] | undefined>(undefined);

  constructor(private httpService: HttpService) {
    this.httpService.getProducts$().subscribe((products) => {
      this.products$.next(products);

      // console.log('Initialize data');
      // console.log(this.products$.getValue()?.slice());
    });
  }

  public getProducts$(): Observable<Product[] | undefined> {
    return this.products$;
  }

  public updateProduct(newProduct: Product): void {
    const currentProducts = this.products$.getValue();
    let productToManipulateIndex = currentProducts?.findIndex(d => d.id === newProduct.id);

    if (currentProducts && productToManipulateIndex && productToManipulateIndex > -1) {
      currentProducts[productToManipulateIndex] = newProduct;
      this.products$.next(currentProducts);

      // console.log('After update data');
      // console.log(this.products$.getValue()?.slice());
    }
  }

  public createProduct(newProduct: Product): void {
    const currentProducts = this.products$.getValue();

    if (currentProducts) {
      currentProducts.push(newProduct);
      this.products$.next(currentProducts);

      // console.log(this.products$.getValue()?.slice());
    }
  }

  public deleteProduct(idToDelete: string): void {
    const currentProducts = this.products$.getValue();
    let productToDeleteIndex = currentProducts?.findIndex(d => d.id === idToDelete);

    if (currentProducts && productToDeleteIndex && productToDeleteIndex > -1) {
      currentProducts.splice(productToDeleteIndex, 1);
      this.products$.next(currentProducts);

      // console.log(this.products$.getValue()?.slice());
    }
  }
}
