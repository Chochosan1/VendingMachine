import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product{
  id: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  private getProductsUrl = 'api/products';

  public getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.getProductsUrl);
  }
}
