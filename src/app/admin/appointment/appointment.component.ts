import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceTicket } from 'app/models/model-export';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ServiceTicketService, AuthXService } from 'app/services/service-export';
import { AppointmentService } from 'app/services/appointment/appointment.service';
import { Appointment } from 'app/models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public allCount: number;
  public completedCount: number;
  public todayCount: number;
  public allRequests: Appointment[];
  public displayedColumns: string[] = ['appointmentID', 'name', 'email', 'start_time'];
  public dataTable: MatTableDataSource<Appointment>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apntmnt: AppointmentService,
    private authX: AuthXService) { }

  ngOnInit() {
    this.apntmnt.getAllAppointments().subscribe(
      next => {
        this.allRequests = next;
        this.dataTable = new MatTableDataSource(next);
        this.dataTable.sort = this.sort;
        this.dataTable.paginator = this.paginator;
        this.allCount = next.length;
        this.todayAppointmentCount(this.allRequests);
      },
      error => console.log(error)
    );

    // this.ticket.getProgressServiceticketsByAptID(this.authX._currentUser.uid).subscribe(
    //   next => {
    //     this.pendingCount = next.length;
    //   },
    //   error => console.log(error)
    // );

    // this.ticket.getCompletedServiceticketsByAptID(this.authX._currentUser.uid).subscribe(
    //   next => {
    //     this.completedCount = next.length;
    //   },
    //   error => console.log(error)
    // );
  }

  public applyFilter(filterValue: string) {
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

  public dateConverter(unixtime: number) {
    const date = new Date(0);
    date.setMilliseconds(unixtime);
    console.log(date);
    return date.toString();
  }

  private todayAppointmentCount(appointments: Appointment[]) {
    const currentDate = new Date();
    this.todayCount = 0;
    for (let i = 0; i < appointments.length; i++) {
      const d = new Date(0);
      d.setUTCMilliseconds(parseInt(appointments[i].start_time, 10));
      if ((currentDate.getFullYear() === d.getFullYear()) &&
        (currentDate.getDate() === d.getDate()) &&
        (currentDate.getMonth() === d.getMonth())) {
          this.todayCount += 1;
      }
    }
  }

}
