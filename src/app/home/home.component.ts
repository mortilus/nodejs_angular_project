import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
    private _router: Router) {
    this._initStatus();
  }

  ngOnInit() {
  }


  private _initStatus() {
    this.cardList = [];
    this.postForm = this._formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this._mainService.getPosts()
      .subscribe(res => {
        this.cardList = res;
      });
  }

  onAddPost() {
    const newCard: ICard = {
      id: null,
      title: this.postForm.get('title').value,
      content: this.postForm.get('content').value
    };
    this._mainService.postPost(newCard)
      .subscribe(res => {
        this._initStatus();
        console.log("Assigned id for new Post: " + res.postId);
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
