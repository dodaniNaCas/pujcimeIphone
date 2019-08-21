import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notBiggerDateValidator(odDatum:string, doDatum: string): boolean{
  const doDate = new Date(doDatum);
  const odDate = new Date(odDatum);
  return odDate < doDate ? true : false;
}
