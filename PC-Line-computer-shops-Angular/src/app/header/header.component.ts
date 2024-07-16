import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}
