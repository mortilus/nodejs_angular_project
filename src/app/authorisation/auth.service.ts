import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _mainUrl: string = "http://localhost:3000";

  public authenticated = new BehaviorSubject<{ authenticated: boolean, email: any }>({ authenticated: false, email: '' });
  authenticated$ = this.authenticated.asObservable();

  constructor(private __http: HttpClient) { }

  register(user: IUser) {
    return this.__http.post<{ message: string, result: { _id: string, email: string, password: string } }>(`${this._mainUrl}/api/user/signup`, user);
  }
  login(user: IUser) {
    return this.__http.post<{ message: string, token: string, email: string }>(`${this._mainUrl}/api/user/login`, user);
  }
  logout() {
    this.authenticated.next({ authenticated: false, email: '' });
    localStorage.setItem('access_token', null);
  }
  isAuthenticated(): boolean {
    if(localStorage.getItem('access_token') != 'null') {
      return true;
    } else { return false; }
  }
}
