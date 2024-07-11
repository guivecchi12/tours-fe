import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TourComponent } from './tour/tour.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'tour/:tourId',
    component: TourComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
