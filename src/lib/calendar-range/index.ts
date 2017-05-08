import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Md2CalendarRange } from './calendar-range';
import { Md2CalendarModule } from '../calendar/index';
import { DateLocale, DateUtil, StyleModule } from '../core';

export * from './calendar-range';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StyleModule,
    Md2CalendarModule
  ],
  exports: [
    Md2CalendarRange
  ],
  declarations: [
    Md2CalendarRange
  ],
  providers: [DateLocale, DateUtil]
})
export class Md2CalendarRangeModule { }
