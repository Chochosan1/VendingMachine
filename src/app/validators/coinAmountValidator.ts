import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidCoinAmount(): ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null => {
        const validAmounts = [0.1, 0.2, 0.5, 1, 2]; //the only valid numbers for the coin insert
        const amount: number = control.value;
        console.log(validAmounts.includes(amount));

        //validation success; to make sure equal floats pass the test and not fail due to precision errors allow only for a miniscule difference
        //NOTE: 0.1 and 0.099999 will pass this test though; created the maxOneDecimalValidator exactly for this
        if (!isNaN(amount) && validAmounts.some(validAmount => Math.abs(validAmount - amount) < 0.0001)) {
            return null;
          }

        //validation fail
        return {'invalidCoinAmount': {value: control.value}};
    }
}