import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product.model';

/**The entire logic for backend requests resides here. */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  private getProductsUrl = 'api/products';

  /**A get request to the products endpoint. @returns A product array observable. */
  public getProducts$(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.getProductsUrl);
  }
}
