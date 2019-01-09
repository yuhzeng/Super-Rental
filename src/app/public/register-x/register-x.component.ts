import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { AuthXService} from '../../services/service-export';
import { IUserData } from '../../models/user-model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-x',
  templateUrl: './register-x.component.html',
  styleUrls: ['./register-x.component.css']
})
export class RegisterXComponent implements OnInit {

  currentRegister: IUserData;
  constructor(private router: Router, public authX: AuthXService ) { }

  public successMessage = false;

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    if (formData && formData.valid) {
      if (formData.value['password'] === formData.value['confirmPassword']) {
        // console.log(formData.value);
        this.currentRegister = {
          uid: Guid.create().toString(),
          first_name: formData.value['firstName'],
          middle_name: 'na',
          last_name: formData.value['lastName'],
          email: formData.value['email'],
          password: formData.value['password'],
          role: 'client'
        };

        this.authX.register(this.currentRegister).then(data => {
            if (data === 'success') {
              this.successMessage = true;
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1000);
            }
          });
       }
      }
    }
  }
