import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(LoginService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login with user credentials', () => {
      const username = 'user';
      const password = 'user';

      const userRole = 'user';

      spyOn(service.userRole$, 'next');
      spyOn(localStorage, 'setItem');

      const result = service.login(username, password);

      expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
      expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', userRole);
      expect(service.userRole$.next).toHaveBeenCalledWith(userRole);
      expect(result).toEqual(service.userRole$.asObservable());
    });

    it('should login with admin credentials', () => {
        const username = 'admin';
        const password = 'admin';
  
        const userRole = 'admin';
  
        spyOn(service.userRole$, 'next');
        spyOn(localStorage, 'setItem');
  
        const result = service.login(username, password);
  
        expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
        expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', userRole);
        expect(service.userRole$.next).toHaveBeenCalledWith(userRole);
        expect(result).toEqual(service.userRole$.asObservable());
    });

    it('should logout ', () => {
        spyOn(service.userRole$, 'next');
        spyOn(localStorage, 'removeItem');
  
        const result = service.logout();
  
        expect(localStorage.removeItem).toHaveBeenCalledWith('isLoggedIn');
        expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
    });

    it('should throw an error for invalid credentials', () => {
      const username = 'invalid';
      const password = 'password';
      spyOn(localStorage, 'setItem');
      const result = service.login(username, password);

      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

});