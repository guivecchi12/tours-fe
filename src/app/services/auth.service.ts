import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserLogin } from '../model/user';
import { catchError, shareReplay } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlingService
  ) {}

  login(email: string, password: string) {
    return this.http
      .post<UserLogin>(
        `${environment.API_URL}${environment.USERS_ENDPOINT}/login`,
        { email, password }
      )
      .pipe(
        catchError((error) => {
          const message = 'Could not login';
          this.errorService.showErrors(message);
          console.log(message, error);
          throw new Error(message, error);
        }),
        shareReplay()
      );
  }
}
