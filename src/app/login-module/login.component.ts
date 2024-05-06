import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared-module/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { defines } from '../shared-module/defines';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup([]);
  public invalidCredentials: boolean = false;
  public hide = true;
  error = '';
  currentRole: string = '';
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }
  public ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  public login() {
    this.loginService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe((res: string) => {
        this.currentRole = res;
        if (res) {
          this.redirectByRole();
          this.error = '';
        } 
      }, (error: any)=> {
            this.invalidCredentials = true;
            this.loginForm.controls['password'].setValue('');
      });
  }

  public redirectByRole() {
    if (this.currentRole == defines.adminRole) {
        console.log('admin')
    } else {
      console.log('user')
    }
  }
}
