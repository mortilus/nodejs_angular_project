import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ICard {
  title: string,
  content: string,
  _id: string
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private _mainUrl: string = "http://localhost:3000";

  constructor(private _http: HttpClient) { }

  public getPosts() {
    return this._http.get<ICard[]>(`${this._mainUrl}/api/posts`);
  }
  public postPost(data: ICard) {
    return this._http.post<{ message: string, postId: string }>(`${this._mainUrl}/api/posts`, data);
  }
  public deletePost(idItem: string) {
    return this._http.delete(`${this._mainUrl}/api/posts/${idItem}`);
  }
  public getPostById(postId: string) {
    return this._http.get<ICard>(`${this._mainUrl}/api/posts/${postId}`);
  }
}
