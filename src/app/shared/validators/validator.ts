import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";

export function ConfirmPasswordValidator(control: AbstractControl) {
  if (
    control &&
    (control.value !== null ||
      control.value !== undefined ||
      control.value !== "")
  ) {
    const confirmpassword = control.value;
    const passControl = control.root.get("password");
    if (passControl) {
      const passValue = passControl.value;
      if (passValue !== confirmpassword) {
        return {
          confirmPassword: true
        };
      }
      return null;
    }
  }
}

export class CustomValidator {
  static numberValidation = /\d/;
  static upperCaseValidation = /[A-Z]/;
  static lowerCaseValidation = /[a-z]/;
  static specialCharValidation = /[!@#$%^&*()_+?><.,]/;

  static passwordMatchValidator(control: AbstractControl) {
    if (
      control &&
      (control.value !== null ||
        control.value !== undefined ||
        control.value !== "")
    ) {
      const password = control.root.get("password");
      const confirmPassword = control.value;
      if (password) {
        if (password.value !== confirmPassword) {
          console.log('correct')
          return {
            confirmPassword: true
          };
        }
      }
    }
  }

  // static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     if (!control.value) {
  //       return null;
  //     }

  //     const valid = regex.test(control.value);

  //     return valid ? null : error;
  //   };
  // }
}
