import { Component } from '@angular/core';
import { MainService } from './main.service';

export interface ICard {
  id:  string,
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

  constructor(private _mainService: MainService) {
    this._mainService.getTest()
      .subscribe(res => {
        this.cardList = res;
      });
    this._mainService.postTest({
      id: '1',
      title: 'title from post',
      content: 'content test'
    })
      .subscribe(res => console.log("Res: " + JSON.stringify(res)));
  }
}
