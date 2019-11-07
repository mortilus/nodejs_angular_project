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
  private _userIdLoggedUser: string = "";

  public authenticated = new BehaviorSubject<{ authenticated: boolean, email: string, userId: string }>({ authenticated: false, email: '', userId: '' });
  authenticated$ = this.authenticated.asObservable();

  constructor(private __http: HttpClient) { }

  register(user: IUser) {
    return this.__http.post<{ message: string, result: { _id: string, email: string, password: string } }>(`${this._mainUrl}/api/user/signup`, user);
  }
  login(user: IUser) {
    return this.__http.post<{ message: string, token: string, email: string, userId: string }>(`${this._mainUrl}/api/user/login`, user);
  }
  logout() {
    this.authenticated.next({ authenticated: false, email: '', userId: '' });
    this.removeAuthDataLS();
  }
  isAuthenticated(): boolean {
    if (localStorage.getItem('access_token') != 'null') {
      return true;
    } else { return false; }
  }
  getUserId() {
    return this._userIdLoggedUser;
  }
  setUserId(userid: string) {
    this._userIdLoggedUser = userid;
  }

  setAuthDataLS(token: string, userid: string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_id', userid);
  }
  removeAuthDataLS() {
    localStorage.setItem('access_token', null);
    localStorage.setItem('user_id', null);
  }
}
