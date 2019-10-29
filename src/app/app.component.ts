import { Component } from '@angular/core';
import { MainService } from './main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

export interface ICard {
  title: string,
  content: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'startProject';
  public cardList: ICard[] = [];

  public postForm: FormGroup;

  constructor(private _mainService: MainService, private _formBuilder: FormBuilder) {
    this._initStatus();
  }

  private _initStatus() {
    this.cardList = [];
    this.postForm = this._formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this._mainService.getTest()
      .subscribe(res => {
        this.cardList = res;
      });
  }

  onAddPost() {
    const newCard: ICard = {
      title: this.postForm.get('title').value,
      content: this.postForm.get('content').value
    };
    this._mainService.postTest(newCard)
      .subscribe(res => {
        this._initStatus();
        console.log("Res: " + JSON.stringify(res));
      });
  }
}
