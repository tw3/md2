import {
  Component, EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'md2-calendar-range',
  templateUrl: 'calendar-range.html',
  styleUrls: ['./calendar-range.css'],
  host: {
    'role': 'calendar-range'
  }
})
export class Md2CalendarRange implements OnInit {

  private _startDate: Date = null;
  private _endDate: Date = null;

  private _startMinDate: Date = null;
  private _startMaxDate: Date = null;
  private _endMinDate: Date = null;
  private _endMaxDate: Date = null;

  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  @Output() startDateChange: EventEmitter<Date>;
  @Output() endDateChange: EventEmitter<Date>;
  @Output() startMinDateChange: EventEmitter<Date>;
  @Output() startMaxDateChange: EventEmitter<Date>;
  @Output() endMinDateChange: EventEmitter<Date>;
  @Output() endMaxDateChange: EventEmitter<Date>;

  constructor() {
    this.startDateChange = new EventEmitter<Date>();
    this.endDateChange = new EventEmitter<Date>();
    this.startMinDateChange = new EventEmitter<Date>();
    this.startMaxDateChange = new EventEmitter<Date>();
    this.endMinDateChange = new EventEmitter<Date>();
    this.endMaxDateChange = new EventEmitter<Date>();
  }

  ngOnInit() { }

  @Input()
  get startMinDate() {
    return this._startMinDate;
  }
  set startMinDate(d: Date) {
    this._startMinDate = d;
    this.startMinDateChange.emit(this.startDate);
  }

  @Input()
  get startDate() {
    return this._startDate;
  }
  set startDate(d: Date) {
    this._startDate = d;
    this.endMinDate = d; // end date cannot be before the start date
    this.startDateChange.emit(this.startDate);
  }

  @Input()
  get startMaxDate() {
    return this._startMaxDate;
  }
  set startMaxDate(d: Date) {
    this._startMaxDate = d;
    this.startMaxDateChange.emit(this.startDate);
  }

  @Input()
  get endMinDate() {
    return this._endMinDate;
  }
  set endMinDate(d: Date) {
    this._endMinDate = d;
    this.endMinDateChange.emit(this.startDate);
  }

  @Input()
  get endDate() {
    return this._endDate;
  }
  set endDate(d: Date) {
    this._endDate = d;
    this.startMaxDate = d; // start date cannot be after the end date
    this.endDateChange.emit(this.endDate);
  }

  @Input()
  get endMaxDate() {
    return this._endMaxDate;
  }
  set endMaxDate(d: Date) {
    this._endMaxDate = d;
    this.endMaxDateChange.emit(this.startDate);
  }

  startDateChanged() {
  }

  endDateChanged() {
  }

}
