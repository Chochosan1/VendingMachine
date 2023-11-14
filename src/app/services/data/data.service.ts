import { Injectable } from '@angular/core';
import { HttpService } from '../requests/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../product.model';

/**Provides all necessary data and CRUD operations. */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _products$ = new BehaviorSubject<Product[] | undefined>(undefined);
  private _coinBalance$ = new BehaviorSubject<number>(0);

  constructor(private httpService: HttpService) {
    this.initializeData();
  }

  private initializeData(): void {
    this.httpService.getProducts$().subscribe((products) => {
      this._products$.next(products);
    });
  }

  public get coinBalance$(): Observable<number> {
    return this._coinBalance$;
  }

  public get coinBalance(): number {
    return this._coinBalance$.getValue();
  }

  /**Get all products in the form of an observable. */
  public get products$(): Observable<Product[] | undefined> {
    return this._products$;
  }

  /**Get all products as an array. */
  public get products(): Product[] | undefined {
    return this._products$.getValue();
  }

  /**Updates an existing product. @argument Takes a new product object and will map it using its id */
  public updateProduct(newProduct: Product): void {
    const currentProducts = this._products$.getValue();
    let productToManipulateIndex = currentProducts?.findIndex(d => d.id === newProduct.id);

    if (currentProducts && productToManipulateIndex && productToManipulateIndex > -1) {
      currentProducts[productToManipulateIndex] = newProduct;
      this._products$.next(currentProducts);
    }
  }

  /**Creates a new product. The id will be automatically generated so it's not necessary for the object to contain it. */
  public createProduct(newProduct: Product): void {
    const currentProducts = this._products$.getValue();

    if (currentProducts) {
      newProduct.id = this.generateUniqueId(); //generates a unique id to ensure that newly created products will not duplicate some of the existing ids
      currentProducts.push(newProduct);
      this._products$.next(currentProducts);
    }
  }

  /**Removes a product. @argument Takes the id of the product. */
  public deleteProduct(idToDelete: string): void {
    const currentProducts = this._products$.getValue();
    let productToDeleteIndex = currentProducts?.findIndex(d => d.id === idToDelete);

    if (currentProducts && productToDeleteIndex && productToDeleteIndex > -1) {
      currentProducts.splice(productToDeleteIndex, 1);
      this._products$.next(currentProducts);
    }
  }

  public addCoinBalance(coinsToAdd: number): void {
    const finalAmount = this._coinBalance$.getValue() + coinsToAdd;
    this._coinBalance$.next(finalAmount);
  }

  public removeCoinBalance(coinsToRemove: number): void {
    const finalAmount = this._coinBalance$.getValue() - coinsToRemove;
    this._coinBalance$.next(finalAmount);
  }

  public resetCoinBalance(): void {
    this._coinBalance$.next(0);
  }

  public hasEnoughCoins(amountToCheck: number): boolean {
    return this._coinBalance$.getValue() >= amountToCheck;
  }

  //helper that generates a unique id that won't ever get duplicated. Uses a current timestamp (unique) + a random number in 
  //case multiple ids get generated at the same time
  private generateUniqueId(): string {
    const timestamp = new Date().getTime().toString(16);
    const randomPart = Math.floor(Math.random() * 10000).toString(16);

    return timestamp + randomPart;
  }
}
