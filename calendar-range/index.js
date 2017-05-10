var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Md2CalendarRange } from './calendar-range';
import { Md2CalendarModule } from '../calendar/index';
import { StyleModule } from '../core';
export * from './calendar-range';
var Md2CalendarRangeModule = (function () {
    function Md2CalendarRangeModule() {
    }
    return Md2CalendarRangeModule;
}());
Md2CalendarRangeModule = __decorate([
    NgModule({
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
        ]
    })
], Md2CalendarRangeModule);
export { Md2CalendarRangeModule };
//# sourceMappingURL=index.js.map