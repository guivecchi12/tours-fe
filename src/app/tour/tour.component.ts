import { Component, OnInit } from '@angular/core';
import { Tour } from '../model/tour';
import { ToursService } from '../services/tours.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css',
})
export class TourComponent implements OnInit {
  tour$: Observable<Tour>;

  constructor(
    private toursService: ToursService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('tourId') ?? '';
    this.tour$ = this.toursService.getTourById(id);
  }

  getFirstStartDate(dates: string[] | undefined): string {
    if (dates && dates[0]) {
      const date = new Date(dates[0]);
      if (!isNaN(date.getTime()))
        return date.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        });
    }
    return 'No available dates';
  }
}
