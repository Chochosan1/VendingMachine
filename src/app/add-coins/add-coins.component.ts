import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data/data.service';
import { ValidCoinAmount } from '../validators/coinAmountValidator';
import { MaxOneDecimalAllowed } from '../validators/maxOneDecimalValidator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-coins',
  templateUrl: './add-coins.component.html',
  styleUrls: ['./add-coins.component.scss']
})
export class AddCoinsComponent {
  coinForm: FormGroup = new FormGroup({});

  constructor(protected dataService: DataService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddCoinsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.coinForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0), ValidCoinAmount(), MaxOneDecimalAllowed()]],
    });
  }

  public onSubmit(form: FormGroup): void{
    if (form.valid){
      const amountToAdd = parseFloat(form.value.amount);
      this.insertCoins(amountToAdd);
    }
  }

  private insertCoins(coinsToAdd: number): void{
    this.dataService.addCoinBalance(coinsToAdd);

    const snackBarRef = this.snackBar.open(`Added ${coinsToAdd} BGN to your vending machine balance!`, 'Close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'success-snackbar',
    });
  }

  protected returnCoins(){
    const balanceReturnedToUser = this.dataService.coinBalance;
    this.dataService.resetCoinBalance();

    const snackBarRef = this.snackBar.open(`${balanceReturnedToUser} BGN has been returned to you. Coin balance reset.`, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

   //helper to determine if the control has a certain type of error (only if it has been interacted with)
   protected hasError(field: string, errorType: string): boolean | null {
    const control = this.coinForm.get(field);
    return control && (control.dirty || control.touched) && control.hasError(errorType);
  }
}
