import { Component } from '@angular/core';
import { LoginComponent } from '../loginSystem/login/login.component';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  loginOut() {
    this.router.navigate(['/login']);
  }
}
