var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
var Md2CalendarRange = (function () {
    function Md2CalendarRange() {
        this._startDate = null;
        this._endDate = null;
        this._startMinDate = null;
        this._startMaxDate = null;
        this._endMinDate = null;
        this._endMaxDate = null;
        this.required = false;
        this.disabled = false;
        this.startDateChange = new EventEmitter();
        this.endDateChange = new EventEmitter();
        this.startMinDateChange = new EventEmitter();
        this.startMaxDateChange = new EventEmitter();
        this.endMinDateChange = new EventEmitter();
        this.endMaxDateChange = new EventEmitter();
    }
    Md2CalendarRange.prototype.ngOnInit = function () { };
    Object.defineProperty(Md2CalendarRange.prototype, "startMinDate", {
        get: function () {
            return this._startMinDate;
        },
        set: function (d) {
            this._startMinDate = d;
            this.startMinDateChange.emit(this.startDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2CalendarRange.prototype, "startDate", {
        get: function () {
            return this._startDate;
        },
        set: function (d) {
            this._startDate = d;
            this.endMinDate = d; // end date cannot be before the start date
            this.startDateChange.emit(this.startDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2CalendarRange.prototype, "startMaxDate", {
        get: function () {
            return this._startMaxDate;
        },
        set: function (d) {
            this._startMaxDate = d;
            this.startMaxDateChange.emit(this.startDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2CalendarRange.prototype, "endMinDate", {
        get: function () {
            return this._endMinDate;
        },
        set: function (d) {
            this._endMinDate = d;
            this.endMinDateChange.emit(this.startDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2CalendarRange.prototype, "endDate", {
        get: function () {
            return this._endDate;
        },
        set: function (d) {
            this._endDate = d;
            this.startMaxDate = d; // start date cannot be after the end date
            this.endDateChange.emit(this.endDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2CalendarRange.prototype, "endMaxDate", {
        get: function () {
            return this._endMaxDate;
        },
        set: function (d) {
            this._endMaxDate = d;
            this.endMaxDateChange.emit(this.startDate);
        },
        enumerable: true,
        configurable: true
    });
    Md2CalendarRange.prototype.startDateChanged = function () {
    };
    Md2CalendarRange.prototype.endDateChanged = function () {
    };
    return Md2CalendarRange;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2CalendarRange.prototype, "required", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2CalendarRange.prototype, "disabled", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2CalendarRange.prototype, "startDateChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2CalendarRange.prototype, "endDateChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2CalendarRange.prototype, "startMinDateChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2CalendarRange.prototype, "startMaxDateChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2CalendarRange.prototype, "endMinDateChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2CalendarRange.prototype, "endMaxDateChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2CalendarRange.prototype, "startMinDate", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2CalendarRange.prototype, "startDate", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2CalendarRange.prototype, "startMaxDate", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2CalendarRange.prototype, "endMinDate", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2CalendarRange.prototype, "endDate", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2CalendarRange.prototype, "endMaxDate", null);
Md2CalendarRange = __decorate([
    Component({selector: 'md2-calendar-range',
        template: "<div class=\"md2-calendar-range\"><div class=\"md2-calendar-range-start-area md2-calendar-range-area\"><div class=\"md2-calendar-range-start-label md2-calendar-range-label\">From: {{ startDate ? (startDate | date: 'longDate') : '(Choose a date)' }}</div><div class=\"md2-calendar-range-start-calendar md2-calendar-range-calendar\"><md2-calendar name=\"startCalendar\" [(ngModel)]=\"startDate\" [disabled]=\"disabled\" [required]=\"required\" [minDate]=\"startMinDate\" [maxDate]=\"startMaxDate\" (change)=\"startDateChanged()\" #startDateControl=\"ngModel\"></md2-calendar></div></div><div class=\"md2-calendar-range-end-area md2-calendar-range-area\"><div class=\"md2-calendar-range-end-label md2-calendar-range-label\">To: {{ endDate ? (endDate | date: 'longDate') : '(Choose a date)' }}</div><div class=\"md2-calendar-range-end-calendar md2-calendar-range-calendar\"><md2-calendar name=\"endCalendar\" [(ngModel)]=\"endDate\" [disabled]=\"disabled\" [required]=\"required\" [minDate]=\"endMinDate\" [maxDate]=\"endMaxDate\" (change)=\"endDateChanged()\" #endDateControl=\"ngModel\"></md2-calendar></div></div></div>",
        styles: [".md2-calendar-range{display:flex}.md2-calendar-range-start-area{border-right:1px solid rgba(0,0,0,.12);padding-right:22px}.md2-calendar-range-end-area{padding-left:22px}.md2-calendar-range-label{padding:10px 0}.md2-calendar-range-calendar{border:1px solid rgba(0,0,0,.12)} /*# sourceMappingURL=calendar-range.css.map */ "],
        host: {
            'role': 'calendar-range'
        }
    }),
    __metadata("design:paramtypes", [])
], Md2CalendarRange);
export { Md2CalendarRange };
//# sourceMappingURL=calendar-range.js.map