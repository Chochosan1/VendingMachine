import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data/data.service';
import { ValidCoinAmount } from '../validators/coinAmountValidator';
import { MaxOneDecimalAllowed } from '../validators/maxOneDecimalValidator';

@Component({
  selector: 'app-add-coins',
  templateUrl: './add-coins.component.html',
  styleUrls: ['./add-coins.component.scss']
})
export class AddCoinsComponent {
  coinForm: FormGroup = new FormGroup({});

  constructor(protected dataService: DataService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddCoinsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.coinForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0), ValidCoinAmount(), MaxOneDecimalAllowed()]],
    });
  }

  public onSubmit(form: FormGroup): void{
    if (form.valid){
      const amountToAdd = parseFloat(form.value.amount);
      this.dataService.addCoinBalance(amountToAdd);
    }
  }

   //helper to determine if the control has a certain type of error (only if it has been interacted with)
   protected hasError(field: string, errorType: string): boolean | null {
    const control = this.coinForm.get(field);
    return control && (control.dirty || control.touched) && control.hasError(errorType);
  }
}
