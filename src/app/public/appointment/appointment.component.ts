import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public workingDays: Date[];
  public selectedDate: Date;
  constructor() {
    this.workingDays = new Array();
    this.getWorkingDays();
  }

  ngOnInit() {
  }

  private getWorkingDays() {
    let count = 0;
    let day = 0;
    while (count < 14) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);

      date.setDate(date.getDate() + day);
      if (!((date.getDay() === 0) || (date.getDay() === 6))) {
        this.workingDays.push(date);
        count = count + 1;
        // console.log(date.getTime());
        // console.log(date);
      }
      day += 1;
    }
    this.selectedDate = this.workingDays[0];
  }

  private dateSelector(date: Date) {
    this.selectedDate = date;
  }


}
