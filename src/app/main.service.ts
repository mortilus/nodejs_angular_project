import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ICard {
  id: string,
  title: string,
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private _mainUrl: string = "http://localhost:3000";

  constructor(private _http: HttpClient) { }

  public getPosts() {
    return this._http.get<{
      id: string,
      title: string,
      content: string,
      creator: string
    }[]>(`${this._mainUrl}/api/posts`);
  }
  public postPost(data: ICard) {
    return this._http.post<{ message: string, post: { title: string, content: string, id: string, creator: string } }>(`${this._mainUrl}/api/posts`, data);
  }
  public deletePost(idItem: string) {
    return this._http.delete(`${this._mainUrl}/api/posts/${idItem}`);
  }
  public getPostById(postId: string) {
    return this._http.get<ICard>(`${this._mainUrl}/api/posts/${postId}`);
  }
  public editPostById(editedPost: ICard) {
    return this._http.put<{ message: string }>(`${this._mainUrl}/api/posts/${editedPost.id}`, editedPost);
  }
}
