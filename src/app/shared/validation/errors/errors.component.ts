import { Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { hasControlErrors } from '../validation.utils';

interface Error {
  key: string;
  params: any;
}

type Errors = Error[];

@Component({
  selector: 'app-validation-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorsComponent implements OnChanges, OnInit, OnDestroy {

  @Input() errors: ValidationErrors;
  @Input() control: AbstractControl;
  @Input() or = false;

  @HostBinding('class.invalid-feedback') invalid = false;

  mappedErrors: Errors;

  private controlSub: Subscription;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(): void {
    this.mapErrors();
  }

  ngOnInit(): void {
    if (this.control) {
      this.controlSub = this.control.statusChanges.subscribe(() => {
        this.mapErrors();
        this.cd.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.controlSub && this.controlSub.unsubscribe();
  }

  mapErrors(): void {
    let errors: ValidationErrors;
    if (this.control) {
      errors = hasControlErrors(this.control, this.or) ? this.control.errors : null;
    } else {
      errors = this.errors;
    }
    this.mappedErrors = errors ? Object.keys(errors).map((key) => {
      return {
        key,
        params: errors[key]
      };
    }) : null;
    this.invalid = !!this.mappedErrors;
  }

}
