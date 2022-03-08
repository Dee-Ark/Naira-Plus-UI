import { AbstractControl } from '@angular/forms';

export function UrlValidator(control: AbstractControl) {
  if (
    control &&
    (control.value !== null ||
      control.value !== undefined ||
      control.value !== '')
  ) {
    const character = control.value;
    const validator = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
    if (character.match(validator)) {
      return null;
    }
  }
  return { url: true };
}
