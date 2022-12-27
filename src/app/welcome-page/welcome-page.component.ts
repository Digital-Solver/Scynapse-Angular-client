// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserLoginService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  title = 'myFlix-Angular-client';
  isLoggedIn: boolean = false;

  constructor(
    public dialog: MatDialog,
    public loginService: UserLoginService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  goToMovies() {
    this.router.navigate(['movies']);
  }
}
