import { AbstractControl, FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(group: AbstractControl, controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (matchingControl?.getError('mustMatch') !== null) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control?.value !== matchingControl?.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}