import { Component, OnInit } from '@angular/core';
import { AuthXService } from 'app/services/login/auth-x.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUserData } from 'app/models/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public lastName: string;
  public profile: FormGroup;
  constructor(private authX: AuthXService, private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.profile = this.fb.group({
      first_name: ['', [Validators.required]],
      middle_name: [''],
      last_name: ['', [Validators.required]],
      gender: [''],
      about_me: [''],
      uid: this.authX._currentUser.uid,
      role: 'admin',
      email: this.authX._currentUser.email
    });

    this.getProfile();
  }

  private getProfile() {
    if (this.authX._currentUser) {
      this.authX.getCurrentUser().subscribe(
        (user: IUserData) => {
          this.profile.patchValue({
            first_name: user.first_name,
            last_name: user.last_name,
            middle_name: user.middle_name,
            gender: user.gender,
            about_me: user.about_me,
            role: user['role']
          });
        }
      );
    }
  }

  public updateProfile(): void {
    // TODO: Success& Failure toaster on update.
    console.log(this.profile.valid);
    if (this.profile.valid) {
      this.toastr.success('Succesfully Updated', 'My Profile', {
        timeOut: 2000
      });
      this.authX.updateUserData(this.profile.value);
    } else {
      this.toastr.error('Failed to Update, Verify all the fields', 'My Profile', {
        timeOut: 2000
      });
    }
  }

}

