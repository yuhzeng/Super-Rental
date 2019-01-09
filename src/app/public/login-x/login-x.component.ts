import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthXService } from '../../services/service-export';
import { IUser } from '../../models/user-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-x',
  templateUrl: './login-x.component.html',
  styleUrls: ['./login-x.component.css']
})
export class LoginXComponent implements OnInit {

  private currentUser: IUser;
  public auth_message: String;

  constructor(private toastr: ToastrService, private router: Router, public authX: AuthXService) {
    this.auth_message = null;
  }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    // console.log(formData);
    if (formData && formData.valid) {
      this.currentUser = {
        email : formData.value['email'],
        password : formData.value['password']
      };
      this.authX.login(this.currentUser)
      .then((user) => {
        if (user === 'verify') {
          this.auth_message = 'Please confirm your verification email';
        } else {
          this.auth_message = user;
        }
      });

    } else {
      console.log('Invalid User');
    }
  }

}
