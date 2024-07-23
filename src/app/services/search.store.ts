import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TourHistory } from '../model/tourHistory';
import { DOCUMENT } from '@angular/common';

const SEARCH_HISTORY = 'search_history';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  private subject = new BehaviorSubject<TourHistory[]>([]);

  searches$: Observable<TourHistory[]> = this.subject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      const searches = localStorage.getItem(SEARCH_HISTORY);
      if (searches) this.subject.next(JSON.parse(searches));

      this.searches$
        .pipe(
          map((searches) =>
            localStorage.setItem(SEARCH_HISTORY, JSON.stringify(searches))
          )
        )
        .subscribe();
    }
  }

  addSearch(search: TourHistory) {
    this.subject.next(this.subject.getValue().concat([search])); // array.push
  }
}
