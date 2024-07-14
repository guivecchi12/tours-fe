import { Component, OnInit } from '@angular/core';
import { AuthStore } from '../service/auth.store';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css',
})
export class UserAvatarComponent implements OnInit {
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;

  constructor(private authStore: AuthStore) {}

  ngOnInit(): void {
    this.user$ = this.authStore.user$;
    this.isLoggedIn$ = this.authStore.isLoggedIn$;
  }
}
