import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../authorisation/auth.service';

export interface ICard {
  id: string,
  title: string,
  content: string,
  creator: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public cardList: ICard[] = [];
  public postForm: FormGroup;
  public loggedUserId: string = ''; 

  constructor(private _mainService: MainService, private _formBuilder: FormBuilder,
    private _router: Router, private _authService: AuthService) {
  }

  ngOnInit() {
    this.loggedUserId = localStorage.getItem('user_id');
    console.log("loff "+ this.loggedUserId);
    this._initStatus();
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
}
