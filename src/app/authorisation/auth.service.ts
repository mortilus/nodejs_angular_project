import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IUser {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _mainUrl: string = "http://localhost:3000";
  private _currentToken: any = null;

  constructor(private __http: HttpClient) { }

  register(user: IUser) {
    return this.__http.post<{ message: string, result: { _id: string, email: string, password: string } }>(`${this._mainUrl}/api/user/signup`, user);
  }
  login(user: IUser) {
    return this.__http.post<{ message: string, token: string }>(`${this._mainUrl}/api/user/login`, user);
  }
  logout() {
    localStorage.setItem('access_token', null);
  }

  // getToken() {
  //   return this._currentToken;
  // };
  // setToken(token: any) {
  //   this._currentToken = token;
  // }

  isAuthenticated(): boolean {
    if(localStorage.getItem('access_token') != 'null') {
      return true;
    } else { return false; }
  }
}
