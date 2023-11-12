import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService, Product } from '../data/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**Handles all logic for the 'Add New Product' form. */
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  protected productForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private dataService: DataService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(30)]],
      price: ['', [Validators.required, Validators.min(0.1)]],
      inStockAmount: ['', [Validators.required, Validators.min(0), Validators.max(15)]],
      imageUrl: ['https://i0.wp.com/sumac.com.hk/wp-content/uploads/2022/11/placeholder.png?ssl=1', Validators.required],
    });
  }

  protected onSubmit(form: FormGroup): void {
    console.log('Valid?', form.valid);
    console.log('Title', form.value.title);
    console.log('Desc', form.value.description);
    console.log('Price', form.value.price);
    console.log('inStockAmount', form.value.inStockAmount);
    console.log('imageUrl', form.value.imageUrl);

    if(form.valid){
      let newProduct: Product = {
        title: form.value.title,
        description: form.value.description,
        price: form.value.price,
        inStockAmount: form.value.inStockAmount,
        imageUrl: form.value.imageUrl
      }
  
      this.addNewProduct(newProduct);
    }
  }

  private addNewProduct(newProduct: Product): void{
    this.dataService.createProduct(newProduct);

    this.snackBar.open(`${newProduct.title} added successfully! You will be redirected to the vending machine in 3 seconds.`, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['multiline-snackbar']
    });
  }

  //helper to determine if the control has a certain type of error (only if it has been interacted with)
  protected hasError(field: string, errorType: string): boolean | null {
    const control = this.productForm.get(field);
    return control && (control.dirty || control.touched) && control.hasError(errorType);
  }
}
