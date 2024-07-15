import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable()
export class ErrorHandlingService {
  private subject = new BehaviorSubject<string[]>([]);

  error$: Observable<string[]> = this.subject
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  constructor() {
    console.log('Service constructor');
  }

  showErrors(...errors: string[]) {
    console.log('adding errors: ', errors);
    this.subject.next(errors);
  }
}
