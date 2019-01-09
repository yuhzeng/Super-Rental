import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
  CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthXService } from '../login/auth-x.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUserData } from 'app/models/user-model';



@Injectable({
  providedIn: 'root'
})
export class AuthXGuardClientService implements CanActivate, CanActivateChild, CanLoad {
  // If the user is admin activate all the Client routes.

  constructor(private AuthX: AuthXService, private router: Router, private firebaseAuth: AngularFireAuth) { }

  // https://github.com/codediodeio/angular-firestarter/blob/master/src/app/core/auth.guard.ts
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | any {

    return this.firebaseAuth.authState.pipe(
      map(auth => {
        if ((auth)) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.firebaseAuth.authState.pipe(
      map(auth => {
        if ((auth)) {
          this.AuthX.getCurrentUser().subscribe(
            (user: IUserData) => {
              if (!user['request_id']) {
                this.router.navigateByUrl('lease');
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
  canLoad(route: Route): boolean {
    throw new Error('Method not implemented.');
  }

}
