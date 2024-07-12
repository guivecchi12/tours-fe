import { Component, OnInit } from '@angular/core';
import { SearchStore } from '../service/search.store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TourHistory } from '../model/tourHistory';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './search-history.component.html',
  styleUrl: './search-history.component.css',
})
export class SearchHistoryComponent implements OnInit {
  searchHistory$: Observable<TourHistory[]>;

  constructor(private router: Router, private searchStore: SearchStore) {}

  ngOnInit(): void {
    this.searchHistory$ = this.searchStore.searches$;
  }
  navigateToTour(tourId: string) {
    this.router.navigateByUrl(`/tour/${tourId}`);
  }
}
