import { Injectable } from '@angular/core';
import { IUser, IUserData, IRole } from '../../models/user-model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { first, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { StellarService } from '../stellar/stellar.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthXService {

  public currentUserState: Observable<firebase.User>;
  public _currentUser: firebase.User;
  public userRegister: Observable<String>;

  constructor(private firebaseAuth: AngularFireAuth,
              private stellarService: StellarService,
              private router: Router,
              private toastr: ToastrService,
              private afs: AngularFirestore) {
      this._currentUser = null;
      this.currentUserState = firebaseAuth.authState;
      this.currentUserState.subscribe((user: firebase.User) => {
        this._currentUser = user;
      });
   }

  get authenticated(): boolean {
    return this._currentUser !== null;
  }

  get currentUserObservable(): any {
    return this.firebaseAuth.authState.pipe(first());
  }

  public updateUserData(user: any) {
      const userRef = this.afs.collection<IUserData>('User').doc(user.uid).ref;
      const roleRef = this.afs.collection<IRole>('Role').doc(user.uid).ref;
      // For Role
      roleRef.get().then(
        (snapShot) => {
          if (!snapShot.exists) {
            const data: IRole = {
              role:  user.role || 'client'
          };
            roleRef.set(data);
          }
        }
      );
      // For User
      userRef.get().then(
        (snapShot) => {
          if (!snapShot.exists) {
            const data: IUserData = {
              uid: user.uid,
              email: user.email,
              first_name: user.displayName || user.first_name,
              last_name: user.displayName || user.last_name,
              middle_name: user.displayName || user.middle_name || '',
              gender: user.gender || '',
              about_me: user.about_me || '',
              password: 'na',
              role: user.role || 'client',
              lease_id: 'na',
              request_id: ''
            };
            userRef.set(data).then(
              () => {
                this.router.navigate([data['role']]);
              }
            );
          } else {
            const data: IUserData = {
              uid: user.uid,
              email: user.email,
              first_name: user.displayName || user.first_name,
              last_name: user.displayName || user.last_name,
              middle_name: user.displayName || user.middle_name || '',
              gender: user.gender || '',
              about_me: user.about_me || '',
              password: 'na',
              role: user.role || 'client'
            };
            userRef.update(data);
          }
        }
      );
      // this.afs.collection('Role').doc(user.uid).valueChanges().subscribe((roleDoc: any) => {
      //     const role: string = (roleDoc) ? roleDoc.role : 'client';
      //     const data: IUserData = {
      //         uid: user.uid,
      //         email: user.email,
      //         first_name: user.displayName || user.first_name,
      //         last_name: user.displayName || user.last_name,
      //         middle_name: user.displayName || user.middle_name || '',
      //         gender: '' || user.gender,
      //         about_me: user.about_me || '',
      //         password: 'na',
      //         role: user.role || 'client'
      //       };
      //     return userRef.set(data);
      // });
  }

  public register(formData: IUserData): any {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(formData.email.toString(), formData.password.toString())
      .then((user) => {
        if (user && user.user.emailVerified === false) {
          user.user.sendEmailVerification();
            const data: IUserData = {
              uid: user.user.uid,
              email: user.user.email,
              first_name: formData.first_name,
              last_name: formData.last_name,
              middle_name: formData.last_name || 'na',
              password: 'na',
              role: 'client'
            };
            this.updateUserData(data);
            this.logout();
            return 'success';
          }
    })
    .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          if (errorCode === 'auth/weak-password') {
            return 'Weak Password';
          } else if (errorCode === 'auth/invalid-email') {
            return 'Invalid Email';
          } else if (errorCode === 'auth/email-already-in-use') {
            return 'Email address already in use';
          } else {
            return'Unable to Register User';
          }
    });
  }

  public navigateUser() {
    this.getCurrentUser().subscribe(
      (data) => {
        if (data['role'] !== undefined) {
          this.router.navigate(['admin']);
        }
      }
    );
  }

  public loginGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((credential) => {
      const user = this.afs.collection<IUserData>('User').doc(credential.user.uid);
      this._currentUser = credential.user;
      user.ref.get().then(
        (userSnapshot) => {
          if (!userSnapshot.exists) {
            console.log('Profile Updated');
            this.updateUserData(credential.user);
          }
        }
      );
    }).then(
      () => {
        this.navigateUser();
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  public loginFacebook() {
    this.firebaseAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((credential) => {
      const user = this.afs.collection<IUserData>('User').doc(credential.user.uid);
      this._currentUser = credential.user;
      user.ref.get().then(
        (userSnapshot) => {
          if (!userSnapshot.exists) {
            console.log('Profile Updated');
            this.updateUserData(credential.user);
          }
          this.navigateUser();
        }
      );
    }).catch((error) => {
      console.log(error);
    });
  }

  public login(formData: IUser) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(formData['email'], formData['password'])
    .then((credential) => {
      const user = this.afs.collection<IUserData>('User').doc(credential.user.uid);
      this._currentUser = credential.user;
      if (!credential.user.emailVerified) {
        this.logout();
        console.log('Verify your email');
        return 'verify';
      } else {
        user.ref.get().then(
          (userSnapshot) => {
            this.navigateUser();
          }
        );
      }
    }).catch((error) => {
          return error.code;
    });
  }


  public isLoggedIn(): boolean {
    return this._currentUser !== null;
  }

  public forgotPassword(email: string): any {
    this.firebaseAuth.auth.sendPasswordResetEmail(email)
    .then(
      () => {
        this.toastr.success('Please verify your inbox', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['login']);
        return 'sent';
      }
    )
    .catch(
      (error) => {
        this.toastr.error('Please verify your email', error.code, {
          timeOut: 2000
        });
         return error.code;
      }
    );
  }

  public logout(): void {
    this.stellarService.clearKeyCache();
    this.firebaseAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(function(error) {
      console.log('Unable to sign Out' + error);
    });
  }

  public getCurrentUser(): Observable<any> {
    return this.afs.collection<IUserData>('User').doc(this._currentUser.uid).valueChanges();
  }
}

