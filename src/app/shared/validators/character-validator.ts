import { Validator, AbstractControl, FormGroup } from '@angular/forms';

export function CharacterValidator(control: AbstractControl) {
  if (
    control &&
    (control.value !== null ||
      control.value !== undefined ||
      control.value !== '')
  ) {
    const character = control.value;
    if (character.match(/^[a-zA-Z\s]+$/)) {
      return null;
    }
  }
  return { character: true };
}
