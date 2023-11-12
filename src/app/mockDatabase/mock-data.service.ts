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
        { id: '18bc439c9596b7', title: 'Waffle', description: 'Crispy. No sugar.', price: 2.60, inStockAmount: 15, imageUrl: 'https://cdncloudcart.com/16474/products/images/2701/sokoladova-vafla-hanuta-44-gr-image_6019d3a2dd7d5_1280x1280.jpeg?1612305332' },
        { id: '18bc439c95978e', title: 'Coca Cola', description: 'Classic.', price: 1.90, inStockAmount: 12, imageUrl: 'https://cdncloudcart.com/16372/products/images/27597/coca-cola-original-taste-1-5-l-63dd3c9887c25_1920x1920.jpeg?1675443607' },
        { id: '18bc439c95922cd', title: 'Coca Cola Zero', description: 'No added sugar.', price: 2.10, inStockAmount: 14, imageUrl: 'https://mcdonalds.bg/wp-content/uploads/2023/01/coca-cola-zero-dostavka.png' },
        { id: '18bc439c959c31', title: 'Beer', description: 'Lager', price: 2.5, inStockAmount: 15, imageUrl: 'https://rada.bg/product_img_big=/products/products_12930_big10@2x.jpg' },
        { id: '18bc43ac7e81bf', title: 'Cookies', description: 'Chocolate flavor', price: 3.8, inStockAmount: 8, imageUrl: 'https://cdncloudcart.com/16372/products/images/57687/griesson-sokoladovi-biskviti-s-fin-mlecen-sokolad-63ba5569e584c_600x600.jpeg?1673155969' },
        { id: '18bc43ac7e81c11', title: 'Chips', description: 'Extra hot', price: 3, inStockAmount: 6, imageUrl: 'https://www.ebag.bg/products/images/104272/800' },
        { id: '18bc439c95910e2', title: 'Water', description: 'Mineral water.', price: 0.7, inStockAmount: 15, imageUrl: 'https://voda-varna.eu/image/cache/voda%20snimki/izvorna-voda-Devin-0.5l-598x757.jpg.webp' },
      ]
    };
  }
}
