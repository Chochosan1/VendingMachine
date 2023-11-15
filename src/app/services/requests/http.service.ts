import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../product.model';
import { GET_PRODUCTS_URL } from 'src/app/app.constants';

/**The entire logic for backend requests resides here. */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  /**A get request to the products endpoint. @returns A product array observable. */
  public getProducts$(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(GET_PRODUCTS_URL);
  }
}
