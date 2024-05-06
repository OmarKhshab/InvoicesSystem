import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { defines } from '../defines';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userRole$: BehaviorSubject<string> = new BehaviorSubject('');
  loginState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private router: Router) {}
  /**
   * @param username 
   * @param password 
   * @returns 
   */
  public login(username: string, password: string): any {
    if (username === defines.userLoginData.username && password === defines.userLoginData.password) {
      this.loginState$.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', defines.userRole );
      this.userRole$.next(defines.userRole);
      return this.userRole$.asObservable();
    } else if ( username === defines.adminLoginData.username && password === defines.adminLoginData.password) {
      this.loginState$.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', defines.adminRole);
      this.userRole$.next(defines.adminRole);
      return this.userRole$.asObservable();
    } else {
        return throwError("error");
    }
  }
  /**
   * logout
   */
  public logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    this.userRole$.next('');
    this.loginState$.next(false);
    window.location.href = '/login';
  }
  public getCurrentRole() {
    if (this.isLoggedIn()) {
      this.loginState$.next(true);
      if (this.userRole$.value) {
        return this.userRole$.value;
      } else {
        const userRole = localStorage.getItem('currentUser') || '';
        this.userRole$.next(userRole);
        return userRole;
      }
    } else {
      return false;
    }
  }
  public isLoggedIn(): boolean {
    return (localStorage.getItem('isLoggedIn') === "true");
  }

    /**
   *
   * @returns {Observable<T>}
   */
     public loginStatus() : Observable<boolean> {
      return this.loginState$.asObservable();
    }
}
