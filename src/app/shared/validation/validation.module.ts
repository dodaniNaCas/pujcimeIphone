import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from 'ngx-validators';

import { ErrorsComponent } from './errors/errors.component';
import { IsInvalidDirective } from './is-invalid.directive';
import { NotBlankDirective } from './not-blank.directive';
import { EqualDirective } from './equal.directive';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ValidatorsModule
  ],
  declarations: [ErrorsComponent, IsInvalidDirective, NotBlankDirective, EqualDirective],
  exports: [ErrorsComponent, IsInvalidDirective, NotBlankDirective, EqualDirective]
})
export class ValidationModule { }
