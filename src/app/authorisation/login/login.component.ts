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
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private _builder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) {
    this.loginForm = this._builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const loggedUser: IUser = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this._authService.login(loggedUser)
      .subscribe(res => { localStorage.setItem('access_token', res.token); alert("Response: " + res.message); this._router.navigate(['/home']); }, err => alert("Login failed!"));
  }

}
