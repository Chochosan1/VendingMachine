import { Component } from '@angular/core';
import { DataService } from '../data/data.service';

/**Displays the information and allows for user interactions. */
@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent {

  constructor(private dataService: DataService) { }

  public productsToDisplay$ = this.dataService.getProducts$();
}
