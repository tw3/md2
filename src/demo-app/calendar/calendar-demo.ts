import { Component } from '@angular/core';

@Component({
  selector: 'calendar-demo',
  templateUrl: '../calendar/calendar-demo.html',
  styles: [`
    .inline-control {
      display: inline-block;
      width: 150px;
      margin-right: 16px;
      padding: 16px 0;
    }
  `]
})
export class CalendarDemo {
  isDisabled = false;
  isRequired = false;
  today: Date = new Date();
  date: Date = null; // new Date(this.today.getTime() - (1000 * 60 * 60 * 24 * 1));
  defaultDateShown: Date = new Date(this.today.getTime() - (1000 * 60 * 60 * 24 * 22));
  minDate: Date = new Date(this.today.getTime() - (1000 * 60 * 60 * 24 * 24));
  maxDate: Date = new Date(this.today.getTime() + (1000 * 60 * 60 * 24 * 12));
  enableDates: Array<Date> = [
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 5),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 8)
  ];
  disableDates: Array<Date> = [
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 2),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 2),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 5),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 9)
  ];
  disableWeekDays: Array<number> = [0, 6];

  setDate() {
    this.date = new Date(this.today);
  }

}
