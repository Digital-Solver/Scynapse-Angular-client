import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { UserLoginService } from '../fetch-api-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logoUrl: string = './scynapse-logo.svg';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    public loginService: UserLoginService
  ) { }

  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  goToHome() {
    this.router.navigate(['']);
  }
  
  goToMovies() {
    this.router.navigate(['movies']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }
}
