import { Component, OnInit } from '@angular/core';
import { DataService, Product } from '../data/data.service';
import { Observable } from 'rxjs';

/**Displays the information and allows for user interactions. */
@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent implements OnInit {

  constructor(private dataService: DataService) { }

  public productsToDisplay$ = this.dataService.getProducts$();

  ngOnInit(): void {
    // setTimeout(() => {
    //   let newProduct: Product = {
    //     id: '1',
    //     title: 'Angel', 
    //     description: 'some',
    //     price: 1.2,
    //     inStockAmount: 10,
    //   };

    //   let newProduct2: Product = {
    //     id: '5',
    //     title: 'Angel2', 
    //     description: 'some2',
    //     price: 1.4,
    //     inStockAmount: 7,
    //   };

    //   this.dataService.updateProduct(newProduct);
    //   this.dataService.createProduct(newProduct2);
    //   this.dataService.deleteProduct('2');
    // }, 2000);
  }
}
