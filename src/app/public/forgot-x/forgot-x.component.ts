import { Component, OnInit } from '@angular/core';
import { IUser } from 'app/models/user-model';
import { ToastrService } from 'ngx-toastr';
import { AuthXService } from 'app/services/service-export';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-x',
  templateUrl: './forgot-x.component.html',
  styleUrls: ['./forgot-x.component.css']
})
export class ForgotXComponent implements OnInit {

  private currentUser: IUser;
  public auth_message: string;
  constructor( public authX: AuthXService, public route: Router) { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    if (formData && formData.valid) {
      const emailID = formData.value['email'];
      this.authX.forgotPassword(emailID);
    }
  }
}
