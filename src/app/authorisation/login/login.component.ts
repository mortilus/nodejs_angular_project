import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _builder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) {
    this.loginForm = this._builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/']);
    }
  }

  login() {
    const loggedUser: IUser = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this._authService.login(loggedUser)
      .subscribe(res => {
        this._authService.setAuthDataLS(res.token, res.userId);
        this._authService.setUserId(res.userId);
        this._authService.authenticated.next({ authenticated: true, email: res.email, userId: res.userId });
        alert("Response: " + res.message); this._router.navigate(['/home']);
      }, err => alert("Login failed!"));
  }

}
