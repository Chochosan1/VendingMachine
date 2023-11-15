import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function PositiveInteger(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: number = control.value;

        //skip validation if the control is not touched/dirty
        if (control.touched === false && control.dirty === false) {
            return null;
        }

        //validation success
        if (Number.isInteger(value) && value >= 0) {
            return null;
        }

        //validation fail
        return { 'positiveInteger': { value: control.value } };
    };
}