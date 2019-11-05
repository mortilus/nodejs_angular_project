import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../authorisation/auth.service';

export interface ICard {
  id: string,
  title: string,
  content: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'startProject';
  public cardList: ICard[] = [];
  public postForm: FormGroup;

  constructor(private _mainService: MainService, private _formBuilder: FormBuilder,
    private _router: Router, private _authService: AuthService) {
    this._initStatus();
  }

  ngOnInit() {
  }


  private _initStatus() {
    this.cardList = [];
    this._mainService.getPosts()
      .subscribe(res => {
        this.cardList = res;
      });
  }
  deletePost(postId: string) {
    this._mainService.deletePost(postId)
      .subscribe(res => {
        console.log("Deleted!");
        this._initStatus();
      });
  }
  editPost(postId: string) {
    this._router.navigate(['edit', postId]);
  }
  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

}
