import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Product } from '../data/data.service';

export function UniquePriceValidator(existingProducts: Product[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const price = control.value;

        //validation fail; found a duplicate price
        if (existingProducts.some((product) => product.price === price)) {
            return { uniquePrice: true };
        }

        //validation success
        return null;
    };
}