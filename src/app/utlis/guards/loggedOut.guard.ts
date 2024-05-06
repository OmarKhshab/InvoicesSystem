import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from 'src/app/shared-module/services/login.service';
import { defines } from 'src/app/shared-module/defines';

export const loggedOutGuard: CanActivateFn = () => {
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);
  if (loginService.isLoggedIn() == false) {
    return true;
  }
  else {
    if (loginService.getCurrentRole() == defines.adminRole) {
      console.log('admin')
      return false;
    }
    else {
      console.log('user')
      return false;
    }
  }
};
