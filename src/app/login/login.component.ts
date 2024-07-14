import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthStore } from '../service/auth.store';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isPasswordVisible: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthStore
  ) {
    this.form = formBuilder.group({
      email: ['admin@natours.io', [Validators.required]],
      password: ['test1234', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) this.router.navigate(['']);
    });
  }

  login() {
    const val = this.form.value;
    this.auth.login(val.email, val.password).subscribe((user) => {
      if (user.status === 'success') {
        this.router.navigate(['']);
      } else {
        console.log('error loggin in');
      }
    });
  }

  showPassword(event: MouseEvent) {
    this.isPasswordVisible = !this.isPasswordVisible;
    event.stopPropagation();
  }
}
