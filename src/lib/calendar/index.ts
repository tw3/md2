import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Calendar } from './calendar';
import { DateLocale, DateUtil, StyleModule } from '../core';

export * from './calendar';

@NgModule({
  imports: [
    CommonModule,
    StyleModule
  ],
  exports: [
    Md2Calendar
  ],
  declarations: [
    Md2Calendar
  ],
  providers: [DateLocale, DateUtil]
})
export class Md2CalendarModule { }
