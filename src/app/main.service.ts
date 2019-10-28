import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ICard {
  title: string,
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private _mainUrl: string = "http://localhost:3000";

  constructor(private _http: HttpClient) { }

  public getTest() {
    return this._http.get<ICard[]>(`${this._mainUrl}/api/posts`);
  }
  public postTest(data: ICard) {
    return this._http.post(`${this._mainUrl}/api/posts`, data);
  }
}
