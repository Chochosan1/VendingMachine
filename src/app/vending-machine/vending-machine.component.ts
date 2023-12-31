import { Component } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCoinsComponent } from '../add-coins/add-coins.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../product.model';

/**Displays the information and allows for user interactions. */
@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent {

  constructor(protected dataService: DataService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  public productsToDisplay$ = this.dataService.products$;
  public coinBalance$ = this.dataService.coinBalance$;

  protected openCoinForm(): void {
    const dialogRef = this.dialog.open(AddCoinsComponent, {
      width: '250px',
    });
  }

  protected purchaseProduct(product: Product): void {
    if (this.dataService.hasEnoughCoins(product.price)) {
      if (product.inStockAmount > 0) {
        product.inStockAmount -= 1;

        this.dataService.updateProduct(product);
        this.dataService.removeCoinBalance(product.price);

        const remainingCoinBalance = this.dataService.coinBalance.toFixed(1);

        this.snackBar.open(`You spent ${product.price} BGN for ${product.title}. Your change is ${remainingCoinBalance} BGN. Please, take it. 
        Coin balance reset.`, 
        'Close', {
          duration: 8000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        this.dataService.resetCoinBalance();
      }
    }
    else {
      const neededAmount = (product.price - this.dataService.coinBalance).toFixed(1);

      this.snackBar.open(`Not enough balance to purchase ${product.title}. You need ${neededAmount} BGN more.`, 
      'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'error-snackbar',
      });
    }
  }
}
