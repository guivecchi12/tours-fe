import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../service/auth.store';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvatarModalComponent } from '../avatar-modal/avatar-modal.component';
import { ClickedOutsideDirective } from '../clicked-outside.directive';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AvatarModalComponent,
    ClickedOutsideDirective,
  ],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css',
})
export class UserAvatarComponent implements OnInit {
  toggleOpen = new BehaviorSubject<boolean>(false);

  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isModelOpen: boolean;

  constructor(private authStore: AuthStore) {}

  ngOnInit(): void {
    this.user$ = this.authStore.user$;
    this.isLoggedIn$ = this.authStore.isLoggedIn$;
  }

  openModel() {
    this.isModelOpen = true;
  }

  logout() {
    this.authStore.logout();
    this.closeModal();
  }

  closeModal() {
    this.isModelOpen = false;
  }
}
