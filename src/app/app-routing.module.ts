import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loggedOutGuard } from './utlis/guards/loggedOut.guard';

const routes: Routes = [
  {
  path: '',
  loadChildren: () =>
    import('./login-module/login.module').then((m) => m.LoginModule),
  canActivate: [loggedOutGuard],
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
