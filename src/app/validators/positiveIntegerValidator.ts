import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function IsAnInteger(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: number = control.value;

        console.log(value);

        //skip validation if the control is not touched/dirty or if it has no value
        if ((control.touched === false && control.dirty === false) || value === undefined || value === null || control.value === "") {
            return null;
        }

        //validation success
        if (Number.isInteger(value)) {
            return null;
        }

        //validation fail
        return { 'integer': { value: control.value } };
    };
}