import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'app/services/appointment/appointment.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

@Component({
  selector: 'app-appointment-time',
  templateUrl: './appointment-time.component.html',
  styleUrls: ['./appointment-time.component.css']
})

export class AppointmentTimeComponent implements OnInit, OnChanges {

  public timeSlots: number[];
  private startTime: number;
  private endTime: number;
  public appointmentForm: FormGroup;

  @Input() appointmentDate: Date;
  // public appointmentDate: Date;

  constructor(private fb: FormBuilder,
              private apmnt: AppointmentService,
              private router: Router,
              private toastr: ToastrService) {
    this.startTime = 9;
    this.endTime = 17;
    this.appointmentDate = new Date();
    this.appointmentDate.setHours(0, 0, 0, 0);
    this.appointmentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      start_time: ['', [Validators.required]]
    });
    // this.generateTimeSlots();
    // console.log(this.appointmentDate);
  }

  ngOnInit() {
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
    // Generate time slots on appointment change after checking in the database
    console.log(changes['appointmentDate']['currentValue']);
    this.generateTimeSlots();
  }

  private generateTimeSlots() {
    this.timeSlots = new Array();
      for (let i = this.startTime; i < this.endTime; i++) {
        this.appointmentDate.setHours(i, 0, 0, 0);
        this.apmnt.getAppointmentCollectionRef(this.appointmentDate.getTime().toString()).get()
          .then((snapshot) => {
            if (!snapshot.exists) {
              this.timeSlots.push(i);
            }
          });
      }
  }

  private getApnmtHour(unixTime: string): number {
    const date = new Date(0);
    date.setUTCSeconds(parseInt(unixTime, 10));
    console.log(date);
    return date.getHours();
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.appointmentDate.setHours(this.appointmentForm.get('start_time').value, 0, 0, 0);
      this.appointmentForm.get('start_time').patchValue(this.appointmentDate.getTime());
      this.apmnt.createNewEvent(this.appointmentForm.value);
      this.generateTimeSlots();
      this.toastr.success('Tour Scheduled', 'Appointment', {
        timeOut: 2000
      });
      this.router.navigate(['']);
    } else {
      this.toastr.error('Failed to schedule an appointment, Verify all the fields', 'Appointment', {
        timeOut: 2000
      });
    }
  }

}
