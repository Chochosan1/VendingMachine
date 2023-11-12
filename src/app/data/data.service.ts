import { Injectable } from '@angular/core';
import { HttpService } from '../requests/http.service';

export interface Product{
  id: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpService: HttpService) { 
    this.httpService.getProducts$().subscribe(value => {
      console.log(value);
    })
  }
}
