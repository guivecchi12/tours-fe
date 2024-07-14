import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserLogin } from '../model/user';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<UserLogin>(
        `${environment.API_URL}${environment.USERS_ENDPOINT}/login`,
        { email, password }
      )
      .pipe(shareReplay());
  }
}
