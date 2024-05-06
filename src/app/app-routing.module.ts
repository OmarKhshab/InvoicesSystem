import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { accessGuard } from './utlis/guards/access.guard';
import { loggedOutGuard } from './utlis/guards/loggedOut.guard';

const routes: Routes = [
  {
  path: '',
  loadChildren: () =>
    import('./login-module/login.module').then((m) => m.LoginModule),
  canActivate: [loggedOutGuard],
},
{
  path: 'user',
  loadChildren: () =>
    import('./user-module/user.module').then((m) => m.UserModule),
  canActivate: [accessGuard],
},
{
  path: '**',
  redirectTo: '',
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
