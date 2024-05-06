import {Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

/**
 * @title header for the app
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public loginState: boolean = false;

  isLoggedIn : Observable<boolean> | undefined;

    /**
     * constructor
     * @param translateService 
     */
    constructor (private translateService: TranslateService, private loginService: LoginService, private router: Router) {
      this.isLoggedIn = loginService.loginStatus();

    }
  /**
   * logout
   */
  public logout() {
    this.loginService.logout();
  }
  /**
   * change language
   */
  public changeLanguage () {
        if (this.translateService.currentLang === 'english') {
            this.translateService.use('arabic');
            document.body.dir = 'rtl';
          } else {
            this.translateService.use('english');
            document.body.dir = 'ltr';
          }
    }
    public goToHomePage() {
      this.router.navigate(['/']);
    }
}    

