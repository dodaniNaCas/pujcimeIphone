import { AbstractControl, ValidationErrors } from '@angular/forms';

export function trimToNull(value: string): string {
  if (typeof value === 'string') {
    const str = ((value as any) as string).trim();
    return (str.length > 0 ? str : null) as any;
  } else {
    return value;
  }
}

export function hasControlErrors(control: AbstractControl, or = false): boolean {
  return control.errors ? control.dirty || or : false;
}
