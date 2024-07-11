import { Component, Input } from '@angular/core';
import { Tour } from '../model/tour';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css',
})
export class TourCardComponent {
  @Input() tours: Tour[] = [];
}
