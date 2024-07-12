import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  user$: Observable<User>;

  constructor() {}

  // login(email: string, password: string): Observable<User> {}
  logout() {}
}
