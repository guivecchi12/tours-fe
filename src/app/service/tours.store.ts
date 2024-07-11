import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tour, ApiResponse, sortByDuration } from '../model/tour';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ToursStore {
  private subject = new BehaviorSubject<Tour[]>([]);

  tours$: Observable<Tour[]> = this.subject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllTours().subscribe();
  }

  private loadAllTours() {
    return this.http.get<ApiResponse>(`${environment.API_URL}/tours`).pipe(
      map((response) => response['data']),
      catchError((err) => {
        const message = 'Could not load Tours';
        return throwError(() => message + err);
      }),
      tap((tours) => {
        console.log('setting tours', tours);
        return this.subject.next(tours);
      }),
      shareReplay()
    );
  }

  filterByCategory(difficulty: string): Observable<Tour[]> {
    return this.tours$.pipe(
      map((tours) => {
        console.log({ tours });
        return tours
          .filter((tour) => tour.difficulty === difficulty)
          .sort(sortByDuration);
      })
    );
  }
}
