import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authorisation/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate() {
    if(this._authService.isAuthenticated()) {
      console.log("Is authenticated");
      return true;
    } else {
      console.log("not authenticated");
      this._router.navigate(['/login']);
      return false;
    }
  }
}
