import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logoUrl = './scynapse-logo.svg';

  constructor(private router: Router) { }
  goToHome() {
    this.router.navigate(['/']);
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
