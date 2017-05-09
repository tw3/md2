import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Md2DateRangePicker } from './date-range-picker';
import { Md2CalendarRangeModule } from '../calendar-range/index';
import { StyleModule } from '../core';

export * from './date-range-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StyleModule,
    Md2CalendarRangeModule
  ],
  exports: [
    Md2DateRangePicker
  ],
  declarations: [
    Md2DateRangePicker
  ]
})
export class Md2DateRangePickerModule { }
