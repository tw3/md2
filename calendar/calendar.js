var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ElementRef, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { coerceBooleanProperty, DateLocale, DateUtil } from '../core';
import { slideCalendar } from '../datepicker/datepicker-animations';
/** Change event object emitted by Md2Calendar. */
var Md2DateChange = (function () {
    function Md2DateChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2DateChange;
}());
export { Md2DateChange };
var Md2Calendar = (function () {
    function Md2Calendar(_element, _locale, _util, _control) {
        this._element = _element;
        this._locale = _locale;
        this._util = _util;
        this._control = _control;
        this._dateValue = null;
        this._defaultDateShown = null;
        this._dateShown = null;
        this._today = null;
        this._required = false;
        this._disabled = false;
        this._calendarGenerated = false;
        this._regenerateInputs = [
            'enableDates', 'disableDates', 'disableWeekDays',
            'minDate', 'maxDate'
        ];
        this._dates = [];
        this._prevMonth = 1;
        this._currMonth = 2;
        this._nextMonth = 3;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        this.enableDates = [];
        this.disableDates = [];
        this.disableWeekDays = [];
        this.isFocused = true;
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new EventEmitter();
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._today = this._util.today(true);
        this._defaultDateShown = this._today;
        this.setWeekDays();
        this.dateShown = this._defaultDateShown;
    }
    Md2Calendar.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this._calendarGenerated) {
            for (var _i = 0, _a = this._regenerateInputs; _i < _a.length; _i++) {
                var inputName = _a[_i];
                if (changes.hasOwnProperty(inputName)) {
                    window.setTimeout(function () {
                        if (!_this._dateValue || _this._isDisabledDate(_this._dateValue)) {
                            _this.updateDateValue(null, false, true);
                        }
                        _this.generateCalendar();
                    }, 0);
                    break;
                }
            }
        }
    };
    Md2Calendar.prototype.ngOnInit = function () {
        this.generateCalendar();
    };
    Md2Calendar.prototype.ngAfterContentInit = function () {
    };
    Md2Calendar.prototype.writeValue = function (value) { this.value = value; };
    Md2Calendar.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    Md2Calendar.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    Md2Calendar.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Md2Calendar.prototype.ngAfterViewInit = function () {
    };
    Object.defineProperty(Md2Calendar.prototype, "value", {
        /**
         * Get/set the date value
         * Only the parent component should set value here
         * Internally we set the value using updateDateValue()
         */
        get: function () { return this._dateValue; },
        set: function (newVal) {
            var newDate = this.coerceDateProperty(newVal);
            this.updateDateValue(newDate, true, false);
        },
        enumerable: true,
        configurable: true
    });
    Md2Calendar.prototype.updateDateValue = function (newDate, bCheckDisabled, triggerChange) {
        this.dateShown = newDate;
        var bIsDisabled = false;
        var newDateValue = null;
        if (newDate) {
            bIsDisabled = bCheckDisabled && this._isDisabledDate(newDate);
            if (!bIsDisabled) {
                newDateValue = newDate;
            }
        }
        this._dateValue = newDateValue;
        if (triggerChange || bIsDisabled) {
            this._emitChangeEvent();
        }
    };
    Object.defineProperty(Md2Calendar.prototype, "defaultDateShown", {
        get: function () { return this._defaultDateShown; },
        set: function (newDate) {
            this._defaultDateShown = newDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "dateShown", {
        /** Get/set the date shown */
        get: function () { return this._dateShown; },
        set: function (newDate) {
            if (!newDate) {
                newDate = this._defaultDateShown;
            }
            newDate = new Date(newDate.getTime());
            newDate = this._util.clampDate(newDate, this.minDate, this.maxDate);
            var bMonthChanged = this._dateShown &&
                this._util.getMonthDistance(this._dateShown, newDate) !== 0;
            this._dateShown = newDate;
            if (bMonthChanged) {
                this.generateCalendar();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "minDate", {
        get: function () { return this._minDate; },
        set: function (date) {
            this._minDate = this._util.parse(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "maxDate", {
        get: function () { return this._maxDate; },
        set: function (date) {
            this._maxDate = this._util.parse(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "dateFocused", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "dateSelected", {
        get: function () { return this._dateValue; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "getMonthLabel", {
        get: function () {
            return this._locale.getMonthLabel(this.dateShown.getMonth(), this.dateShown.getFullYear());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generate Month Calendar
     */
    Md2Calendar.prototype.generateCalendar = function () {
        this._dates.length = 0;
        var year = this.dateShown.getFullYear();
        var month = this.dateShown.getMonth();
        var firstDayOfMonth = this._util.getFirstDateOfMonth(this.dateShown);
        var calMonth = this._prevMonth;
        var date = this._util.getFirstDateOfWeek(firstDayOfMonth, this._locale.firstDayOfWeek);
        do {
            var week = [];
            for (var i = 0; i < 7; i++) {
                if (date.getDate() === 1) {
                    if (calMonth === this._prevMonth) {
                        calMonth = this._currMonth;
                    }
                    else {
                        calMonth = this._nextMonth;
                    }
                }
                week.push({
                    date: date,
                    index: date.getDate(),
                    calMonth: calMonth,
                    today: this._util.isSameDay(this._today, date),
                    disabled: this._isDisabledDate(date)
                });
                date = new Date(date.getTime());
                date.setDate(date.getDate() + 1);
            }
            this._dates.push(week);
        } while ((date.getMonth() <= month) && (date.getFullYear() === year));
        this._calendarGenerated = true;
    };
    /**
     * Date Selection Event
     * @param event Event Object
     * @param date Date Object
     */
    Md2Calendar.prototype._onClickDate = function (event, date) {
        this._stopEvent(event);
        if (date.disabled) {
            return;
        }
        if (date.calMonth === this._prevMonth) {
            this._updateMonth(-1);
        }
        else if (date.calMonth === this._currMonth) {
            this.updateDateValue(date.date, false, true);
        }
        else if (date.calMonth === this._nextMonth) {
            this._updateMonth(1);
        }
    };
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    Md2Calendar.prototype._updateMonth = function (noOfMonths) {
        this.dateShown = this._util.incrementMonths(this.dateShown, noOfMonths);
        if (noOfMonths > 0) {
            this.calendarState('right');
        }
        else {
            this.calendarState('left');
        }
    };
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    Md2Calendar.prototype._isBeforeMonth = function () {
        return this.minDate ?
            this._util.getMonthDistance(this.dateShown, this.minDate) < 0 :
            true;
    };
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    Md2Calendar.prototype._isAfterMonth = function () {
        return this.maxDate ?
            this._util.getMonthDistance(this.dateShown, this.maxDate) > 0 :
            true;
    };
    Md2Calendar.prototype.setWeekDays = function () {
        this._weekDays = this._locale.getDays();
    };
    Md2Calendar.prototype.coerceDateProperty = function (value) {
        var newDate = null;
        if (value) {
            if (this._util.isValidDate(value)) {
                newDate = value;
            }
            else {
                var timestamp = Date.parse(value);
                if (!isNaN(timestamp)) {
                    newDate = new Date(timestamp);
                }
            }
        }
        return newDate;
    };
    /**
     * Check the date is enabled or not
     * @param date Date Object
     * @return boolean
     */
    Md2Calendar.prototype._isDisabledDate = function (date) {
        for (var _i = 0, _a = this.enableDates; _i < _a.length; _i++) {
            var d = _a[_i];
            if (this._util.isSameDay(date, d)) {
                return false;
            }
        }
        for (var _b = 0, _c = this.disableDates; _b < _c.length; _b++) {
            var d = _c[_b];
            if (this._util.isSameDay(date, d)) {
                return true;
            }
        }
        for (var _d = 0, _e = this.disableWeekDays; _d < _e.length; _d++) {
            var d = _e[_d];
            if (date.getDay() === d) {
                return true;
            }
        }
        return !this._util.isDateWithinRange(date, this.minDate, this.maxDate);
    };
    /** Emits an event when the user selects a date. */
    Md2Calendar.prototype._emitChangeEvent = function () {
        this._onTouched();
        this._onChange(this.value);
        this.change.emit(new Md2DateChange(this, this.value));
    };
    Md2Calendar.prototype._stopEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    Md2Calendar.prototype.calendarState = function (direction) {
        var _this = this;
        this._calendarState = direction;
        setTimeout(function () { return _this._calendarState = ''; }, 180);
    };
    return Md2Calendar;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], Md2Calendar.prototype, "enableDates", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], Md2Calendar.prototype, "disableDates", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], Md2Calendar.prototype, "disableWeekDays", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2Calendar.prototype, "isFocused", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2Calendar.prototype, "value", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2Calendar.prototype, "defaultDateShown", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], Md2Calendar.prototype, "required", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], Md2Calendar.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Calendar.prototype, "minDate", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Calendar.prototype, "maxDate", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Calendar.prototype, "change", void 0);
Md2Calendar = __decorate([
    Component({selector: 'md2-calendar',
        template: "<div class=\"md2-calendar active\" [class.disabled]=\"disabled\"><div class=\"md2-calendar-header\"><div class=\"md2-button\" [class.disabled]=\"!_isBeforeMonth() || disabled\" (click)=\"_isBeforeMonth() && _updateMonth(-1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path></svg></div><div class=\"md2-calendar-month-year\" [@slideCalendar]=\"_calendarState\">{{ getMonthLabel }}</div><div class=\"md2-button\" [class.disabled]=\"!_isAfterMonth() || disabled\" (click)=\"_isAfterMonth() && _updateMonth(1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path></svg></div></div><table class=\"md2-calendar-dates\"><thead><tr><th *ngFor=\"let day of _weekDays\">{{day.xshort}}</th></tr></thead><tbody [@slideCalendar]=\"_calendarState\"><tr *ngFor=\"let w of _dates\"><td *ngFor=\"let d of w\"><div class=\"md2-calendar-day\" [class.today]=\"d.today\" [class.focus]=\"_util.isSameDay(dateFocused, d.date)\" [class.selected]=\"_util.isSameDay(dateSelected, d.date)\" [class.disabled]=\"d.disabled || disabled\" [class.prev-month]=\"d.calMonth===_prevMonth\" [class.curr-month]=\"d.calMonth===_currMonth\" [class.next-month]=\"d.calMonth===_nextMonth\" (click)=\"_onClickDate($event,d)\">{{d.index}}</div></td></tr></tbody></table></div>",
        styles: [":host{display:block;position:relative;width:276px;height:290px;overflow:hidden}.md2-calendar{position:absolute;top:0;right:0;display:block;width:100%;height:280px;font-size:12px;font-weight:400;text-align:center;transition:.3s}.md2-calendar-header{display:flex;justify-content:space-between;font-size:14px;font-weight:700;text-align:center;line-height:48px}.md2-calendar-header .md2-calendar-month-year-header{width:100%}.md2-calendar-header .md2-button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.md2-calendar-header .md2-button svg{vertical-align:top}.md2-calendar-dates{margin:0 8px}.md2-calendar-dates th{width:35px;height:16px;font-weight:500;line-height:10px;opacity:.5}.md2-calendar-dates td{padding:0}.md2-calendar-day{position:relative;display:inline-block;width:35px;height:35px;border-radius:50%;text-align:center;cursor:pointer;line-height:35px;box-sizing:border-box}.md2-calendar-day.today{color:#106cc8}.md2-calendar-day.focus,.md2-calendar-day:hover{background:#e0e0e0}.md2-calendar-day.selected,.md2-calendar-day.selected:hover{color:#fff;background:#106cc8}.md2-calendar-day.disabled,.md2-calendar-day.disabled:hover{color:rgba(0,0,0,.43);background:0 0;pointer-events:none}.md2-calendar-day.next-month,.md2-calendar-day.prev-month{visibility:hidden}.disabled .md2-button{cursor:default}.disabled svg{fill-opacity:.2}.disabled .md2-calendar-month-year{opacity:.5} /*# sourceMappingURL=calendar.css.map */ "],
        host: {
            'role': 'calendar'
        },
        animations: [
            slideCalendar
        ]
    }),
    __param(3, Self()), __param(3, Optional()),
    __metadata("design:paramtypes", [ElementRef,
        DateLocale,
        DateUtil,
        NgControl])
], Md2Calendar);
export { Md2Calendar };
//# sourceMappingURL=calendar.js.map