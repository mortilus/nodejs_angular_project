import { Component } from '@angular/core';
import { AuthService } from './authorisation/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _authService: AuthService) { }

  authenticated(): boolean {
    return this._authService.isAuthenticated();
  }
}
