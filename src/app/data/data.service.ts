import { Injectable } from '@angular/core';
import { HttpService } from '../requests/http.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  inStockAmount: number;
  imageUrl: string;
}

/**Provides all necessary data and CRUD operations. */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private products$ = new BehaviorSubject<Product[] | undefined>(undefined);
  private _coinBalance: number = 0;
  get coinBalance(): number {
    return this._coinBalance;
}

  constructor(private httpService: HttpService) {
    this.initializeData();
  }

  private initializeData(): void {
    this.httpService.getProducts$().subscribe((products) => {
      this.products$.next(products);
    });
  }

  /**Get all products in the form of an observable. */
  public getProducts$(): Observable<Product[] | undefined> {
    return this.products$;
  }

  /**Updates an existing product. @argument Takes a new product object and will map it using its id */
  public updateProduct(newProduct: Product): void {
    const currentProducts = this.products$.getValue();
    let productToManipulateIndex = currentProducts?.findIndex(d => d.id === newProduct.id);

    if (currentProducts && productToManipulateIndex && productToManipulateIndex > -1) {
      currentProducts[productToManipulateIndex] = newProduct;
      this.products$.next(currentProducts);
    }
  }

  /**Creates a new product. The id will be automatically generated so it's not necessary for the object to contain it. */
  public createProduct(newProduct: Product): void {
    const currentProducts = this.products$.getValue();

    if (currentProducts) {
      newProduct.id = this.generateUniqueId(); //generates a unique id to ensure that newly created products will not duplicate some of the existing ids
      currentProducts.push(newProduct);
      this.products$.next(currentProducts);
    }
  }

  /**Removes a product. @argument Takes the id of the product. */
  public deleteProduct(idToDelete: string): void {
    const currentProducts = this.products$.getValue();
    let productToDeleteIndex = currentProducts?.findIndex(d => d.id === idToDelete);

    if (currentProducts && productToDeleteIndex && productToDeleteIndex > -1) {
      currentProducts.splice(productToDeleteIndex, 1);
      this.products$.next(currentProducts);
    }
  }

  public addCoinBalance(coinsToAdd: number): void{
    this._coinBalance += coinsToAdd;
  }

  public removeCoinBalance(coinsToRemove: number): void{
    this._coinBalance -= coinsToRemove;
  }

  public resetCoinBalance(): void{
    this._coinBalance = 0;
  }

  //helper that generates a unique id that won't ever get duplicated. Uses a current timestamp (unique) + a random number in 
  //case multiple ids get generated at the same time
  private generateUniqueId(): string {
    const timestamp = new Date().getTime().toString(16);
    const randomPart = Math.floor(Math.random() * 10000).toString(16);

    return timestamp + randomPart;
  }
}
