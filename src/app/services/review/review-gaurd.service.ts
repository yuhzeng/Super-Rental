import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class ReviewGaurdService implements CanActivate {

  constructor(private firebaseAuth: AngularFireAuth) { }

  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): any  {
    return this.firebaseAuth.authState.pipe(
     map(auth => {
       return true;
     })
   );
 }
}
