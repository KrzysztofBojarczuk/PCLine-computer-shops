import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/loginUser';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(loginUser: LoginUser) {
    this.authService.loginUserService(loginUser).subscribe(
      (res) => {
        const token = res.token;
        this.authService.setToken(token);
        this.authService.setLoggedIn(true);
        this.isLoggedIn = true;
        this.router.navigate(['/shops']);
      },
      (err) => {
        this.errorMessage = 'Invalid username or password';
        this.isLoggedIn = false;
      }
    );
  }
}
