import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UniquePriceValidator } from '../validators/uniquePriceValidator';
import { MaxOneDecimalAllowed } from '../validators/maxOneDecimalValidator';
import { Product } from '../product.model';
import { IsAnInteger } from '../validators/positiveIntegerValidator';
import { DEFAULT_IMAGE_URL } from '../app.constants';

/**Handles all logic for the 'Add New Product' form. */
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  protected productForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private dataService: DataService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(30)]],
      price: ['', [Validators.required, Validators.min(0.1), MaxOneDecimalAllowed(), 
        UniquePriceValidator(this.dataService.products ? this.dataService.products : [])]],
      inStockAmount: ['', [Validators.required, Validators.min(0), Validators.max(15), IsAnInteger()]],
      imageUrl: [DEFAULT_IMAGE_URL, Validators.required],
    });
  }

  protected onSubmit(form: FormGroup): void {
    if (form.valid) {
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

  private addNewProduct(newProduct: Product): void {
    this.dataService.createProduct(newProduct);

    const snackBarRef = this.snackBar.open(`${newProduct.title} added successfully! You will be redirected to the vending machine in 3 seconds. Or you can manually do it.`, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/vending']);
    })
  }

  //helper to determine if the control has a certain type of error (only if it has been interacted with)
  protected hasError(field: string, errorType: string): boolean | null {
    const control = this.productForm.get(field);
    return control && (control.dirty || control.touched) && control.hasError(errorType);
  }
}
