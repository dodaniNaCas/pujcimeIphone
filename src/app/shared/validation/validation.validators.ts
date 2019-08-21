import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

export function notBlankValidator(control: AbstractControl): ValidationErrors {
  const value = control.value;
  return value === null || `${value}`.trim().length === 0 ? { notBlank: true } : null;
}

export function approveNotBlankValidator(control: AbstractControl): ValidationErrors {
  const value = control.value;
  return value === null || `${value}`.trim().length === 0 ? { approveNotBlank: true } : null;
}

export function notBlankDateValidator(control: AbstractControl): ValidationErrors {
  if (control.parent && control.parent.controls) {

    if (control.parent.controls['contractOwnerBirthDate'] === control) {
      return notBlankValidator(control) === null ? null : { notBlankBirthDate: true };
    }
    else {
      return notBlankValidator(control) === null ? null : { notBlankDate: true };

    }
  }
}



export function equalValidator(firstControl: AbstractControl, secondControl: AbstractControl): ValidationErrors {
  const firstValue = firstControl.value;
  const secondValue = secondControl.value;
  return firstValue === secondValue ? { equal: true } : null;
}

export function emailValidator(control: AbstractControl): ValidationErrors {
  const value = control.value;
  if (value === null || `${value}`.trim().length === 0) {
    return null;
  }
  var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){1,}$/;
  return pattern.test(value) ? null : { emailValidator: true };
}

export function phoneValidator(control: AbstractControl): ValidationErrors {
  let value = String(control.value);
  value = value.replace(/\s/g, '');
  if (value === null || value.length === 0) {
    return null;
  }
  let pattern = /^\+\d{12}$/;
  return pattern.test(value) ? null : { phoneValidator: true };
}

export function dateLessThan(from: string, to: string, msgKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
		if (!from || !to) {
			return null;
		}

		let fromValue = group.controls[from].value;
		let toValue = group.controls[to].value;

		if (!fromValue || fromValue === '' || !toValue || toValue === '') {
			return null;
		}

		let fromDate = new Date(fromValue.split(".").reverse().join("-"));
		let toDate = new Date(toValue.split(".").reverse().join("-"));
		
		if (fromDate <= toDate) {
			return null;
		}
		
		return {
			dates: msgKey
		};
	}
}

export function positiveNumberValidator(control: AbstractControl): ValidationErrors {
	return positiveNumberValidatorValue(String(control.value), true);
}

export function positiveNumberValidatorValue(value: string, decimal: boolean): ValidationErrors {
	let validatedValue = value;
	validatedValue = value.replace(/\s/g, '');
  if (validatedValue === null || validatedValue.length === 0) {
    return { positiveNumberValidator: true };
	}
	let pattern;
	if (decimal) {
		pattern = /^\d*(,\d{1,2})?$/;
	} else {
		pattern = /^\d+$/;
	}
	return pattern.test(validatedValue) ? null : { positiveNumberValidator: true };
}

export function birthNumberValidator(control: AbstractControl) {
	const value = control.value;
  	if (value === null || `${value}`.trim().length === 0) {
    	return null;
  	}
	  
	let pattern = /^\d{6}\/(\d{4}|\d{3})$/;
	return pattern.test(value) ? null : { birthNumberValidator: true };
}

export function recaptchaValidator(control: AbstractControl) {
	const value = control.value;
  	if (value === null || value === undefined || value === false) {
		return { recaptchaValidator: true };
	}
	return null;
}

export function divideBy(control: string, num: number, msgKey: string) {
  return (group: FormGroup): { [key: string]: any } => {
    if (!control) {
      return null;
    }

    const valueNumber: string = group.controls[control].value;
    const dividedBy = num;

    if (!valueNumber || valueNumber === '') {
      return null;
    }

    if (valueNumber.length != 11) {
      return null;
    }

    const stringValueWithout = valueNumber.replace('/', '');

    const lastNum = +(stringValueWithout.substring(0, 9)) % dividedBy;

    return (lastNum === +stringValueWithout.substring(9)) ? null : (lastNum === 10 && (+stringValueWithout.substring(9) === 0)) ? null :{ divideBy: msgKey };
  }
}

export function dateInPast(control: string, datePipe: DatePipe, msgKey: string) {
  return (group: FormGroup): { [key: string]: any } => {
    if (!control) {
      return { dateInPast: msgKey };
    }

    const dateToValue: string = group.controls[control].value;
    if (dateToValue === null) {
      return;
    }

    const dateOffStart = new Date(dateToValue.split(".").reverse().join("-"))
    let dateToday = new Date(datePipe.transform(new Date(), 'yyyy-MM-dd'));
    dateToday.setHours(0);

    if (!dateToValue || dateToValue === '') {
      return { dateInPast: msgKey };
    }

    return (dateOffStart >= dateToday) ? null : { dateInPast: msgKey };
  }
}

