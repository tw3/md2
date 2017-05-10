import { AfterContentInit, AfterViewInit, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DateLocale, DateUtil } from '../core';
/** Change event object emitted by Md2Calendar. */
export declare class Md2DateChange {
    source: Md2Calendar;
    value: Date;
    constructor(source: Md2Calendar, value: Date);
}
export declare class Md2Calendar implements OnChanges, OnInit, AfterContentInit, AfterViewInit, ControlValueAccessor {
    private _element;
    private _locale;
    private _util;
    _control: NgControl;
    private _dateValue;
    private _defaultDateShown;
    private _dateShown;
    private _today;
    private _required;
    private _disabled;
    private _calendarGenerated;
    private _regenerateInputs;
    _dates: Array<Object>;
    _calendarState: string;
    _weekDays: Array<any>;
    _prevMonth: number;
    _currMonth: number;
    _nextMonth: number;
    constructor(_element: ElementRef, _locale: DateLocale, _util: DateUtil, _control: NgControl);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    _onChange: (value: any) => void;
    registerOnChange(fn: (value: any) => void): void;
    _onTouched: () => void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    ngAfterViewInit(): void;
    enableDates: Array<Date>;
    disableDates: Array<Date>;
    disableWeekDays: Array<number>;
    isFocused: boolean;
    /**
     * Get/set the date value
     * Only the parent component should set value here
     * Internally we set the value using updateDateValue()
     */
    value: any;
    private updateDateValue(newDate, bCheckDisabled, triggerChange);
    defaultDateShown: Date;
    /** Get/set the date shown */
    dateShown: Date;
    required: boolean;
    disabled: boolean;
    /** The minimum selectable date. */
    private _minDate;
    minDate: Date;
    /** The maximum selectable date. */
    private _maxDate;
    maxDate: Date;
    /** Event emitted when the selected date has been changed by the user. */
    change: EventEmitter<Md2DateChange>;
    readonly dateFocused: Date;
    readonly dateSelected: Date;
    readonly getMonthLabel: string;
    /**
     * Generate Month Calendar
     */
    private generateCalendar();
    /**
     * Date Selection Event
     * @param event Event Object
     * @param date Date Object
     */
    _onClickDate(event: Event, date: any): void;
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    _updateMonth(noOfMonths: number): void;
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    _isBeforeMonth(): boolean;
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    _isAfterMonth(): boolean;
    private setWeekDays();
    private coerceDateProperty(value);
    /**
     * Check the date is enabled or not
     * @param date Date Object
     * @return boolean
     */
    private _isDisabledDate(date);
    /** Emits an event when the user selects a date. */
    private _emitChangeEvent();
    private _stopEvent(event);
    private calendarState(direction);
}
