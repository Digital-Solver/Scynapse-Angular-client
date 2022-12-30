// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserLoginService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * The welcome page component of the app.
 * 
 * @remarks
 * From this page, the user can either login or register.
 * Once login details are in localstorage, the welcome page will show a button that navigates to the 'Movies' page.
 */
@Component({
  selector: 'app-root',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  /** The title of the app. */
  title = 'myFlix-Angular-client';

  /** Whether the user is logged in. */
  isLoggedIn: boolean = false;

  /**
   * Constructs a new instance of the `WelcomePageComponent`.
   *
   * @param dialog The dialog service for opening the user registration and login dialogs.
   * @param loginService The login service for checking the login status of the user.
   * @param router The router service for navigating to different pages of the app.
   */
  constructor(
    public dialog: MatDialog,
    public loginService: UserLoginService,
    private router: Router,
    ) { }

  /** Initializes the component by subscribing to the login status of the user. */
  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  /** Opens the user registration dialog. */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /** Opens the user login dialog. */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  /** Navigates to the 'Movies' page. */
  goToMovies() {
    this.router.navigate(['movies']);
  }
}
