import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'date-range-picker-demo',
  templateUrl: '../date-range-picker/date-range-picker-demo.html',
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
export class DateRangePickerDemo implements OnInit {
  isDisabled = false;
  today: Date = null;

  private _startMinDate: Date = null;
  private _startDateValue: Date = null;
  private _startDatePicker: Date = null;
  private _startMaxDate: Date = null;

  private _endMinDate: Date = null;
  private _endDateValue: Date = null;
  private _endDatePicker: Date = null;
  private _endMaxDate: Date = null;

  private _oneDay = 1000 * 60 * 60 * 24;

  constructor() {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
  }

  ngOnInit() { }

  get startMinDate(): Date { return this._startMinDate; }
  set startMinDate(d: Date) {
    this._startMinDate = d;
  }

  get startDateValue(): Date { return this._startDateValue; }
  set startDateValue(d: Date) {
    this._startDateValue = d;
    this.startDatePicker = d;
  }

  get startDatePicker(): Date { return this._startDatePicker; }
  set startDatePicker(d: Date) {
    this._startDatePicker = d;
    if (d) {
      this.endMinDate = new Date(d.getTime() + (1000 * 60 * 60 * 24 * 14));
    }
  }

  get startMaxDate(): Date { return this._startMaxDate; }
  set startMaxDate(d: Date) { this._startMaxDate = d; }

  get endMinDate(): Date { return this._endMinDate; }
  set endMinDate(d: Date) {
    this._endMinDate = d;
    if (d) {
      this.endMaxDate = new Date(d.getTime() + (1000 * 60 * 60 * 24 * 76));
    }
  }

  get endDateValue(): Date { return this._endDateValue; }
  set endDateValue(d: Date) {
    this._endDateValue = d;
    this.endDatePicker = d;
  }

  get endDatePicker(): Date { return this._endDatePicker; }
  set endDatePicker(d: Date) { this._endDatePicker = d; }

  get endMaxDate(): Date { return this._endMaxDate; }
  set endMaxDate(d: Date) { this._endMaxDate = d; }

  setDateRange() {
    this.startMinDate = new Date(this.today.getTime());
    this.startDateValue = new Date(this.today.getTime());
    this.startMaxDate = new Date(this.today.getTime() + (this._oneDay * 14));
    this.endDateValue = new Date(this.today.getTime() + (this._oneDay * 21));
  }

  reset() {
    this.startMinDate = null;
    this.startDateValue = null;
    this.startMaxDate = null;
    this.endMinDate = null;
    this.endDateValue = null;
    this.endMaxDate = null;
  }

}
