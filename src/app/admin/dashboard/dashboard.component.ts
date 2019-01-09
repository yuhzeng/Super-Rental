import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public showNav: boolean;
  constructor() {
    this.showNav = true;
  }

  ngOnInit() {
  }

  public display() {
    if (this.showNav) {
      this.showNav = false;
    } else {
      this.showNav = true;
    }
  }
}
