import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tour, ApiResponse, sortByDuration } from '../model/tour';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToursStore implements OnDestroy {
  private subject = new BehaviorSubject<Tour[]>([]);

  tours$: Observable<Tour[]> = this.subject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllTours();
  }

  private loadAllTours() {
    const loadTours$ = this.http
      .get<ApiResponse>(`${environment.API_URL}${environment.TOURS_ENDPOINT}`)
      .pipe(
        map((response) => response['data']),
        catchError((err) => {
          const message = 'Could not load Tours';
          return throwError(() => message + err);
        }),
        tap((tours) => this.subject.next(tours)),
        shareReplay()
      );

    loadTours$.subscribe();
  }

  filterByCategory(difficulty: string): Observable<Tour[]> {
    return this.tours$.pipe(
      map((tours) =>
        tours
          .filter((tour) => tour.difficulty === difficulty)
          .sort(sortByDuration)
      )
    );
  }

  ngOnDestroy(): void {
    this.subject.next([]);
  }
}
