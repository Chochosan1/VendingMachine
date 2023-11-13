import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-add-coins',
  templateUrl: './add-coins.component.html',
  styleUrls: ['./add-coins.component.scss']
})
export class AddCoinsComponent {
  coinForm: FormGroup = new FormGroup({});

  constructor(protected dataService: DataService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddCoinsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.coinForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  public onSubmit(form: FormGroup): void{
    if (form.valid){
      const amountToAdd = parseFloat(form.value.amount);
      this.dataService.coinBalance += amountToAdd;
    }
  }
}
