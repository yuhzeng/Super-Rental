import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /**
   * Dashboard is a bootstrap component for the client Module which inherits the default router
   *
   */
  public showNav: boolean;
  constructor() {
    this.showNav = true;
  }

  ngOnInit() {
  }
  public display() {

    if (this.showNav) {
      // console.log(false);
      this.showNav = false;
    } else {
      // console.log(true);
      this.showNav = true;
    }

  }


}
