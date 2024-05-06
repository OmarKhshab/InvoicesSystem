import {
  ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
  } from '@angular/router';
  import { inject } from '@angular/core';
  import { LoginService } from 'src/app/shared-module/services/login.service';
  import { defines } from 'src/app/shared-module/defines';
  
  export const accessGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const loginService: LoginService = inject(LoginService);
    const currentUser = loginService.getCurrentRole();
    const router: Router = inject(Router);
    if (state.url.includes(defines.adminRole)) {
      if (currentUser === defines.adminRole) {
        return true;
      } else if (currentUser === defines.userRole) {
        router.navigate(['/user']);
        return false;
      }
    } else if(state.url.includes(defines.userRole)) {
      if (currentUser == defines.userRole) {
        return true;
      } else if (currentUser === defines.adminRole) {
        router.navigate(['/admin']);
        return false;
      }
    }
  
    loginService.logout();
    return false;
  };
  