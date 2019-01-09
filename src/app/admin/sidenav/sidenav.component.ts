import { Component, OnInit, Input } from '@angular/core';
import { AuthXService } from 'app/services/login/auth-x.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public authX: AuthXService) {
    // console.log(this.authX._currentUser.uid);
  }
  @Input() showNav: boolean;

  ngOnInit() {
  }

}
