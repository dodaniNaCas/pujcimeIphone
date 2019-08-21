import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

import { notBlankValidator } from './validation.validators';

@Directive({
  selector: '[appNotBlankValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: NotBlankDirective, multi: true}]
})
export class NotBlankDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): { [key: string]: any; } {
    return notBlankValidator(control);
  }

}
