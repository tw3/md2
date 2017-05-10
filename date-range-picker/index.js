var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Md2DateRangePicker } from './date-range-picker';
import { Md2CalendarRangeModule } from '../calendar-range/index';
import { StyleModule } from '../core';
export * from './date-range-picker';
var Md2DateRangePickerModule = (function () {
    function Md2DateRangePickerModule() {
    }
    return Md2DateRangePickerModule;
}());
Md2DateRangePickerModule = __decorate([
    NgModule({
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
], Md2DateRangePickerModule);
export { Md2DateRangePickerModule };
//# sourceMappingURL=index.js.map