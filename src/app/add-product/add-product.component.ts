import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService, Product } from '../data/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required, Validators.maxLength(50)],
      price: [0, [Validators.required, Validators.min(0)]],
      inStockAmount: [0, [Validators.required, Validators.min(0), Validators.max(15)]],
      imageUrl: ['https://i0.wp.com/sumac.com.hk/wp-content/uploads/2022/11/placeholder.png?ssl=1', Validators.required],
    });
  }

  public onSubmit(form: FormGroup): void {
    console.log('Valid?', form.valid); // true or false
    console.log('Title', form.value.title);
    console.log('Desc', form.value.description);
    console.log('Price', form.value.price);
    console.log('inStockAmount', form.value.inStockAmount);
    console.log('imageUrl', form.value.imageUrl);

    let newProduct: Product = {
      title: form.value.title,
      description: form.value.description,
      price: form.value.price,
      inStockAmount: form.value.inStockAmount,
      imageUrl: form.value.imageUrl
    }

    this.addNewProduct(newProduct);
  }

  private addNewProduct(newProduct: Product): void{
    this.dataService.createProduct(newProduct);
  }
}
