import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export interface IUser {
  email: string,
  password: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private _builder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) {
    this.registerForm = this._builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/']);
    }
  }

  registerUser() {
    const newUser: IUser = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    };
    this._authService.register(newUser)
      .subscribe(res => {
        console.log(res.message + " ID: " + res.result._id);
      });
    console.log("Registering --> " + this.registerForm.get('email').value + " with " + this.registerForm.get('password').value);
  }

}
