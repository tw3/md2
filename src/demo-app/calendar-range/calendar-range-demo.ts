import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calendar-range-demo',
  templateUrl: '../calendar-range/calendar-range-demo.html',
  styles: [`
      .inline-control {
          display: inline-block;
          width: 150px;
          margin-right: 16px;
          padding: 16px 0;
      }
      .datebox {
          display: flex;
          align-items: baseline;
      }
  `]
})
export class CalendarRangeDemo implements OnInit {
  isDisabled = false;
  isRequired = false;
  today: Date = new Date();
  private _startDate: Date = null;
  private _endDate: Date = null;
  private _startMinDate: Date = null;
  private _startMaxDate: Date = null;
  private _endMinDate: Date = null;
  private _endMaxDate: Date = null;

  private _oneDay = 1000 * 60 * 60 * 24;

  constructor() { }

  ngOnInit() { }

  get startMinDate(): Date {
    return this._startMinDate;
  }
  set startMinDate(d: Date) {
    this._startMinDate = d;
  }

  get startDate(): Date {
    return this._startDate;
  }
  set startDate(d: Date) {
    this._startDate = d;
    if (d) {
      this.endMinDate = new Date(d.getTime() + (1000 * 60 * 60 * 24 * 14));
    }
  }

  get startMaxDate(): Date {
    return this._startMaxDate;
  }
  set startMaxDate(d: Date) {
    this._startMaxDate = d;
  }

  get endMinDate(): Date {
    return this._endMinDate;
  }
  set endMinDate(d: Date) {
    this._endMinDate = d;
    if (d) {
      this.endMaxDate = new Date(d.getTime() + (1000 * 60 * 60 * 24 * 76));
    }
  }

  get endDate(): Date {
    return this._endDate;
  }
  set endDate(d: Date) {
    this._endDate = d;
  }

  get endMaxDate(): Date {
    return this._endMaxDate;
  }
  set endMaxDate(d: Date) {
    this._endMaxDate = d;
  }

  setDateRange() {
    this.startMinDate = this.today;
    this.startDate = new Date(this.today);
    this.startMaxDate = new Date(this.today.getTime() + (this._oneDay * 14));
    this.endDate = new Date(this.today.getTime() + (this._oneDay * 21));
  }

}
