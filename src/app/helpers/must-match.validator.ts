import { AbstractControl, FormGroup } from '@angular/forms';

export function MustMatch(group: AbstractControl, controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (matchingControl?.getError('mustMatch') !== null) {
      return;
    }

    if (control?.value !== matchingControl?.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}