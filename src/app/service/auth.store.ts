import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { User, UserLogin } from '../model/user';
import { AuthService } from './auth.service';
import { DOCUMENT } from '@angular/common';

const AUTH_TOKEN = 'authToken';
const AUTH_DATA = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private subject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      // check if AUTH_TOKEN has expired
      const token = localStorage.getItem(AUTH_TOKEN);
      if (!token) this.logout();

      // check if there is auth data
      const user = localStorage.getItem(AUTH_DATA);
      if (user) {
        this.subject.next(JSON.parse(user));
      }
    }

    // set isLoggedIn
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
  }

  login(email: string, password: string) {
    return this.authService.login(email, password).pipe(
      tap((response: UserLogin) => {
        localStorage.setItem(AUTH_TOKEN, response.token);

        const user = response.data.user;
        this.subject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      })
    );
  }
  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_DATA);
  }
}
