import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ALLOWED_DENOMINATIONS } from "../app.constants";

export function ValidCoinAmount(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const validAmounts = ALLOWED_DENOMINATIONS; //the only valid numbers for the coin insert
        const amount: number = control.value;

        //skip validation if the control is not touched/dirty
        if ((control.touched === false && control.dirty === false) || control.value === undefined || control.value === null || control.value === "") {
            return null;
        }

        //validation success; to make sure equal floats pass the test and not fail due to precision errors allow only for a miniscule difference
        //NOTE: 0.1 and 0.099999 will pass this test though; created the maxOneDecimalValidator exactly for this
        if ((!isNaN(amount) && validAmounts.some(validAmount => Math.abs(validAmount - amount) < 0.0001))) {
            return null;
        }

        //validation fail
        return { 'invalidCoinAmount': { value: control.value } };
    }
}