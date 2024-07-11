import { Component, OnInit } from '@angular/core';
import { Tour } from '../model/tour';
import { ToursService } from '../service/tours.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule],
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
}
