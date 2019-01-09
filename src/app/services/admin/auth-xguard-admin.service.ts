import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
  CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthXService } from '../login/auth-x.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from 'rxjs/internal/scheduler/async';
import { IUserData } from 'app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthXGuardAdminService implements CanActivate, CanActivateChild, CanLoad {
  // If the user is admin activate all the Admin routes.
  private toNavigate: Promise<boolean>;

  constructor(private AuthX: AuthXService, private router: Router, private firebaseAuth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    throw new Error('Method not implemented.');
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): any  {
     return this.firebaseAuth.authState.pipe(
      map(auth => {
        if ((auth)) {
          this.AuthX.getCurrentUser().subscribe(
            (user: IUserData) => {
              if ( user['role'] !== 'admin') {
                this.router.navigate([user['role']]);
              }
            }
          );
          return true;
        } else {
          this.router.navigateByUrl('login');
          return false;
        }
      })
    );
  }
  canLoad(route: Route): boolean  {
    throw new Error('Method not implemented.');
  }

}
