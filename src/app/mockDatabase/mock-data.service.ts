import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

/**A fake API to simulate exposed endpoints. */
@Injectable({
  providedIn: 'root'
})
export class MockDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    return {
      products: [
        { id: '1', title: 'Product 1', description: 'Description for Product 1' },
        { id: '2', title: 'Product 2', description: 'Description for Product 2' },
        { id: '3', title: 'Product 3', description: 'Description for Product 3' }
      ]
    };
  }
}
