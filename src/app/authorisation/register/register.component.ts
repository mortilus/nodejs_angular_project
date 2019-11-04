import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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
    private _authService: AuthService) {
    this.registerForm = this._builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
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
