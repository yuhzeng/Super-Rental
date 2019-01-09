import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  public navigateBack(): void {
    this.router.navigate(['lease', 'userinfo']);
  }

}
