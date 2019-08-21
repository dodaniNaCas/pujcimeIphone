import { ChangeDetectorRef, Directive, HostBinding, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { hasControlErrors } from './validation.utils';

@Directive({
  selector: '[appValidationIsInvalid]'
})
export class IsInvalidDirective implements OnChanges, OnInit, OnDestroy {

  @Input() errors: ValidationErrors;
  @Input() control: AbstractControl;
  @Input() or = false;

  @HostBinding('class.is-invalid') invalid = false;

  private controlSub: Subscription;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(): void {
    this.checkErrors();
  }

  ngOnInit(): void {
    if (this.control) {
      this.controlSub = this.control.statusChanges.subscribe(() => {
        this.checkErrors();
        this.cd.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.controlSub && this.controlSub.unsubscribe();
  }

  checkErrors(): void {
    this.invalid = this.control ? hasControlErrors(this.control, this.or) : !!this.errors;
  }

}
