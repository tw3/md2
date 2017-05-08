import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import {
  coerceBooleanProperty,
  DateLocale,
  DateUtil
} from '../core';
import { slideCalendar } from '../datepicker/datepicker-animations';

/** Change event object emitted by Md2Calendar. */
export class Md2DateChange {
  constructor(public source: Md2Calendar, public value: Date) { }
}

@Component({
  moduleId: module.id,
  selector: 'md2-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css'],
  host: {
    'role': 'calendar'
  },
  animations: [
    slideCalendar
  ]
})
export class Md2Calendar
  implements OnChanges, OnInit, AfterContentInit, AfterViewInit, ControlValueAccessor {

  private _dateValue: Date = null;
  private _defaultDateShown: Date = null;
  private _dateShown: Date = null;
  private _today: Date = null;

  private _required: boolean = false;
  private _disabled: boolean = false;

  private _calendarGenerated: boolean = false;
  private _regenerateInputs = [
    'enableDates', 'disableDates', 'disableWeekDays',
    'minDate', 'maxDate']

  _dates: Array<Object> = [];

  _calendarState: string;

  _weekDays: Array<any>;

  _prevMonth: number = 1;
  _currMonth: number = 2;
  _nextMonth: number = 3;

  constructor(private _element: ElementRef,
              private _locale: DateLocale,
              private _util: DateUtil,
              @Self() @Optional() public _control: NgControl) {
    if (this._control) {
      this._control.valueAccessor = this;
    }

    this._today = this._util.today(true);
    this._defaultDateShown = this._today;

    this.setWeekDays();

    this.dateShown = this._defaultDateShown;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._calendarGenerated) {
      for (let inputName of this._regenerateInputs) {
        if (changes.hasOwnProperty(inputName)) {
          window.setTimeout(() => {
            if (!this._dateValue || this._isDisabledDate(this._dateValue)) {
              this.updateDateValue(null, false, true);
            }
            this.generateCalendar();
          }, 0);
          break;
        }
      }
    }
  }

  ngOnInit() {
    this.generateCalendar();
  }

  ngAfterContentInit() {
  }

  writeValue(value: any): void { this.value = value; }

  _onChange = (value: any) => { };
  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  _onTouched = () => { };
  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit() {
  }

  @Input() enableDates: Array<Date> = [];
  @Input() disableDates: Array<Date> = [];
  @Input() disableWeekDays: Array<number> = [];
  @Input() isFocused = true;

  /**
   * Get/set the date value
   * Only the parent component should set value here
   * Internally we set the value using updateDateValue()
   */
  @Input()
  get value() { return this._dateValue; }
  set value(newVal: any) {
    let newDate = this.coerceDateProperty(newVal);
    this.updateDateValue(newDate, true, false);
  }

  private updateDateValue(newDate: Date,
                          bCheckDisabled: boolean,
                          triggerChange: boolean): void {
    this.dateShown = newDate;
    let bIsDisabled = false;
    let newDateValue = null;
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
  }

  @Input()
  get defaultDateShown() { return this._defaultDateShown; }
  set defaultDateShown(newDate: Date) {
    this._defaultDateShown = newDate;
  }

  /** Get/set the date shown */
  get dateShown() { return this._dateShown; }
  set dateShown(newDate: Date) {
    if (!newDate) {
      newDate = this._defaultDateShown;
    }
    newDate = new Date(newDate.getTime());
    newDate = this._util.clampDate(newDate, this.minDate, this.maxDate);
    const bMonthChanged = this._dateShown &&
      this._util.getMonthDistance(this._dateShown, newDate) !== 0;
    this._dateShown = newDate;
    if (bMonthChanged) {
      this.generateCalendar();
    }
  }

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }

  /** The minimum selectable date. */
  private _minDate: Date;
  @Input()
  get minDate(): Date { return this._minDate; }
  set minDate(date: Date) {
    this._minDate = this._util.parse(date);
  }

  /** The maximum selectable date. */
  private _maxDate: Date;
  @Input()
  get maxDate(): Date { return this._maxDate; }
  set maxDate(date: Date) {
    this._maxDate = this._util.parse(date);
  }

  /** Event emitted when the selected date has been changed by the user. */
  @Output() change: EventEmitter<Md2DateChange> =
    new EventEmitter<Md2DateChange>();

  get dateFocused(): Date { return null; }

  get dateSelected() { return this._dateValue; }

  get getMonthLabel(): string {
    return this._locale.getMonthLabel(this.dateShown.getMonth(),
      this.dateShown.getFullYear());
  }

  /**
   * Generate Month Calendar
   */
  private generateCalendar(): void {
    this._dates.length = 0;
    let year = this.dateShown.getFullYear();
    let month = this.dateShown.getMonth();
    let firstDayOfMonth = this._util.getFirstDateOfMonth(this.dateShown);
    let calMonth = this._prevMonth;
    let date = this._util.getFirstDateOfWeek(firstDayOfMonth, this._locale.firstDayOfWeek);
    do {
      let week: Array<any> = [];
      for (let i = 0; i < 7; i++) {
        if (date.getDate() === 1) {
          if (calMonth === this._prevMonth) {
            calMonth = this._currMonth;
          } else {
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
  }

  /**
   * Date Selection Event
   * @param event Event Object
   * @param date Date Object
   */
  _onClickDate(event: Event, date: any) {
    this._stopEvent(event);
    if (date.disabled) { return; }
    if (date.calMonth === this._prevMonth) {
      this._updateMonth(-1);
    } else if (date.calMonth === this._currMonth) {
      this.updateDateValue(date.date, false, true);
    } else if (date.calMonth === this._nextMonth) {
      this._updateMonth(1);
    }
  }

  /**
   * Update Month
   * @param noOfMonths increment number of months
   */
  _updateMonth(noOfMonths: number) {
    this.dateShown = this._util.incrementMonths(this.dateShown, noOfMonths);
    if (noOfMonths > 0) {
      this.calendarState('right');
    } else {
      this.calendarState('left');
    }
  }

  /**
   * Check is Before month enabled or not
   * @return boolean
   */
  _isBeforeMonth() {
    return this.minDate ?
      this._util.getMonthDistance(this.dateShown, this.minDate) < 0 :
      true;
  }

  /**
   * Check is After month enabled or not
   * @return boolean
   */
  _isAfterMonth() {
    return this.maxDate ?
      this._util.getMonthDistance(this.dateShown, this.maxDate) > 0 :
      true;
  }

  private setWeekDays() {
    this._weekDays = this._locale.getDays();
  }

  private coerceDateProperty(value: any): Date {
    let newDate: Date = null;
    if (value) {
      if (this._util.isValidDate(value)) {
        newDate = value;
      } else {
        let timestamp = Date.parse(value);
        if (!isNaN(timestamp)) {
          newDate = new Date(timestamp);
        }
      }
    }
    return newDate;
  }

  /**
   * Check the date is enabled or not
   * @param date Date Object
   * @return boolean
   */
  private _isDisabledDate(date: Date): boolean {
    for (let d of this.enableDates) {
      if (this._util.isSameDay(date, d)) {
        return false;
      }
    }
    for (let d of this.disableDates) {
      if (this._util.isSameDay(date, d)) {
        return true;
      }
    }
    for (let d of this.disableWeekDays) {
      if (date.getDay() === d) {
        return true;
      }
    }
    return !this._util.isDateWithinRange(date, this.minDate, this.maxDate);
  }

  /** Emits an event when the user selects a date. */
  private _emitChangeEvent(): void {
    this._onTouched();
    this._onChange(this.value);
    this.change.emit(new Md2DateChange(this, this.value));
  }

  private _stopEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private calendarState(direction: string): void {
    this._calendarState = direction;
    setTimeout(() => this._calendarState = '', 180);
  }

}
