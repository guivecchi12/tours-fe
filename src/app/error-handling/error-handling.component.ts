import { Component, OnInit } from '@angular/core';
import { ErrorHandlingService } from '../services/error-handling.service';
import { Observable, tap } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-handling',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './error-handling.component.html',
  styleUrl: './error-handling.component.css',
})
export class ErrorHandlingComponent implements OnInit {
  showErrorMessage = false;
  errors$: Observable<string[]>;

  constructor(public errorService: ErrorHandlingService) {}

  ngOnInit(): void {
    this.errors$ = this.errorService.error$.pipe(
      tap(() => (this.showErrorMessage = true))
    );
  }

  onClose() {
    this.showErrorMessage = false;
  }
}
