import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateLocale, DateUtil, OverlayModule, PortalModule } from '../core';
import { Md2Datepicker } from './datepicker';
import { Md2Clock } from './clock';
import { StyleModule } from '../core/style/index';

export * from './datepicker';
export * from './clock';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    StyleModule,
  ],
  exports: [
    Md2Datepicker,
    Md2Clock,
  ],
  declarations: [
    Md2Datepicker,
    Md2Clock,
  ],
  providers: [DateLocale, DateUtil],
  entryComponents: [
    Md2Datepicker,
  ]
})
export class Md2DatepickerModule { }
