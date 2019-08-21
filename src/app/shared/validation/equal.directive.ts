import { Directive, Attribute } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

import { equalValidator } from './validation.validators';

@Directive({
  selector: '[appEqualValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualDirective, multi: true}]
})
export class EqualDirective implements Validator {
  constructor(@Attribute('validateEqual') public validateEqual: string,
  @Attribute('reverse') public reverse: string) {
  }

  private get isReverse() {
      if (!this.reverse) { return false; }
      return this.reverse === 'true' ? true : false;
  }

  validate(c: AbstractControl): { [key: string]: any } {
      // self value
      const value = c.value;

      // control vlaue
      const equal = c.root.get(this.validateEqual);

      // value not equal
      if (equal && value !== equal.value && !this.isReverse) {
          return {
              validateEqual: false
          };
      }

      // value equal and reverse
      if (equal && value === equal.value && this.isReverse) {
          delete equal.errors['validateEqual'];
          if (!Object.keys(equal.errors).length) { equal.setErrors(null); }
      }

      // value not equal and reverse
      if (equal && value !== equal.value && this.isReverse) {
          equal.setErrors({ validateEqual: false });
      }

      return null;
  }
}
