// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserLoginService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * The welcome page component of the app.
 */
@Component({
  selector: 'app-root',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
    /**
   * The title of the app.
   */
  title = 'myFlix-Angular-client';

  /**
   * Whether the user is logged in.
   */
  isLoggedIn: boolean = false;

  /**
   * Constructs a new instance of the `WelcomePageComponent`.
   *
   * @param dialog The dialog service.
   * @param loginService The login service.
   * @param router The router service.
   */
  constructor(
    public dialog: MatDialog,
    public loginService: UserLoginService,
    private router: Router,
    ) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  /**
   * Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  /**
   * Navigates to the 'Movies' page.
   */
  goToMovies() {
    this.router.navigate(['movies']);
  }
}
