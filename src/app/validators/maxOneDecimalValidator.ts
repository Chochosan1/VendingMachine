import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//makes sure that the number has max 1 decimal place after the 0.
//Example: 0.1 is allowed; 0.099999 is not
export function MaxOneDecimalAllowed(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex = /^\d+(\.\d{0,1})?$/; // regex that allows digits with an optional single decimal place

    //validation success
    if (regex.test(control.value)) {
      return null;
    }

    //validation fail
    return { 'maxOneDecimalAllowed': { value: control.value } };
  };
}