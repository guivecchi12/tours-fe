import { Component, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ToursStore } from '../services/tours.store';
import { catchError, map } from 'rxjs/operators';
import { Tour } from '../model/tour';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { SearchHistoryComponent } from '../search-history/search-history.component';
import { SearchStore } from '../services/search.store';
import { TourHistory } from '../model/tourHistory';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    SearchHistoryComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnDestroy {
  searchResults$: Observable<Tour[]> | undefined;
  constructor(
    private router: Router,
    private tourStore: ToursStore,
    private searchStore: SearchStore
  ) {}

  searchTour(searchInput: string) {
    this.searchResults$ = this.tourStore.tours$.pipe(
      map((tours) =>
        tours.filter((tour) => {
          if (searchInput) {
            return tour.name.toLowerCase().includes(searchInput.toLowerCase());
          }
          return;
        })
      ),
      catchError((err) => {
        throw new Error('search error', err);
      })
    );
  }
  navigateToTour(tour: TourHistory) {
    this.router.navigateByUrl(`/tour/${tour.id}`);
    this.addToSearchHistory(tour);
  }

  clearSearch(searchInput: HTMLInputElement) {
    searchInput.value = '';
    this.searchResults$ = new Observable<[]>();
  }

  private addToSearchHistory(search: TourHistory) {
    this.searchStore.addSearch(search);
  }

  ngOnDestroy(): void {
    this.searchResults$ = undefined;
  }
}
