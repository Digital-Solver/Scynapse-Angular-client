import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { UserLoginService } from '../fetch-api-data.service';

/** 
 * The header component for the app, contains navigation links and the app logo. 
*/
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /** URL for the app logo */
  logoUrl: string = './scynapse-logo.svg';

  /** Whether the user is logged in or not */
  isLoggedIn: boolean = false;

  /**
   * Constructs a new instance of the `HeaderComponent`.
   * 
   * @param router Angular module to navigate routes
   * @param loginService Service for handling user login
   */
  constructor(
    private router: Router,
    public loginService: UserLoginService
  ) { }

  /** Initializes the component by subscribing to the `isLoggedIn$` observable to determine whether the user is logged in. */
  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  /** Navigates to the Home page */
  goToHome() {
    this.router.navigate(['']);
  }
  
  /** Navigates to Movies page */
  goToMovies() {
    this.router.navigate(['movies']);
  }

  /** Navigates to Profile page */
  goToProfile() {
    this.router.navigate(['profile']);
  }

  /** Logs the user out by clearing the local storage and navigating to the default screen */
  logout() {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
