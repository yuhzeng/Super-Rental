import { Component, OnInit, Input } from '@angular/core';
import { AuthXService } from 'app/services/login/auth-x.service';
import { IUserData } from 'app/models/user-model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  public hideContent: boolean;
  constructor(
    public authX: AuthXService) { }
  @Input() showNav: boolean;

  ngOnInit() {
    this.authX.getCurrentUser().subscribe(
      (user: IUserData) => {
        if ((user['lease_id'] !== 'na')) {
          this.hideContent = true;
        } else {
          this.hideContent = false;
        }
      }
    );
  }

}
