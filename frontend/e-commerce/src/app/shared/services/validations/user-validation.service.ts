import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {

  constructor() { }


  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password || password.length < 5) {
      return { tooShort: true };
    } else if (!/[A-Z]/.test(password)) {
      return { noUppercase: true };
    } else if (!/[a-z]/.test(password)) {
      return { noLowercase: true };
    } else if (!/\d/.test(password)) {
      return { noNumber: true };
    }
    return null;
  }


  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? { misMatch: true }
      : null;
  }


}
