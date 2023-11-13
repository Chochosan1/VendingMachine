import { Component } from '@angular/core';
import { DataService, Product } from '../data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCoinsComponent } from '../add-coins/add-coins.component';

/**Displays the information and allows for user interactions. */
@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent {

  constructor(protected dataService: DataService, private dialog: MatDialog) { }

  public productsToDisplay$ = this.dataService.getProducts$();

  protected openCoinForm(): void {
    const dialogRef = this.dialog.open(AddCoinsComponent, {
      width: '250px',
    });
  }

  protected purchaseProduct(product: Product): void{
    console.log('purchase attempt');
    if(this.dataService.coinBalance >= product.price){
      product.inStockAmount -= 1;

      this.dataService.updateProduct(product);
      this.dataService.removeCoinBalance(product.price);

      console.log(`purchase success for: ${product.title} with id ${product.id}`);
    }
  }
}
