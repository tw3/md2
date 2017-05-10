import { EventEmitter, OnInit } from '@angular/core';
export declare class Md2CalendarRange implements OnInit {
    private _startDate;
    private _endDate;
    private _startMinDate;
    private _startMaxDate;
    private _endMinDate;
    private _endMaxDate;
    required: boolean;
    disabled: boolean;
    startDateChange: EventEmitter<Date>;
    endDateChange: EventEmitter<Date>;
    startMinDateChange: EventEmitter<Date>;
    startMaxDateChange: EventEmitter<Date>;
    endMinDateChange: EventEmitter<Date>;
    endMaxDateChange: EventEmitter<Date>;
    constructor();
    ngOnInit(): void;
    startMinDate: Date;
    startDate: Date;
    startMaxDate: Date;
    endMinDate: Date;
    endDate: Date;
    endMaxDate: Date;
    startDateChanged(): void;
    endDateChanged(): void;
}
