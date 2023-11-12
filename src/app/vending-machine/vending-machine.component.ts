import { Component, OnInit } from '@angular/core';
import { DataService, Product } from '../data/data.service';

/**Displays the information and allows for user interactions. */
@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent implements OnInit {

constructor(private dataService: DataService){}

  ngOnInit(): void {
    setTimeout(() => {
      let newProduct: Product = {
        id: '1',
        title: 'Angel', 
        description: 'some'
      };

      let newProduct2: Product = {
        id: '5',
        title: 'Angel2', 
        description: 'some2'
      };

      this.dataService.updateProduct(newProduct);
      this.dataService.createProduct(newProduct2);
      this.dataService.deleteProduct('2');
    }, 2000);
  }
}
