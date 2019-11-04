import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _builder: FormBuilder,
    private _authService: AuthService) {
    this.loginForm = this._builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    const loggedUser: IUser = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this._authService.login(loggedUser)
      .subscribe(res => { this._authService.setToken(res.token); console.log("Response: " + res.message) });
  }

}
