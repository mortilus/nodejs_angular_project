import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICard, MainService } from 'src/app/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private _mainService: MainService, private _router: Router, private _formBuilder: FormBuilder) {
    this.postForm = this._formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onAddPost() {
    const newCard: ICard = {
      id: null,
      title: this.postForm.get('title').value,
      content: this.postForm.get('content').value
    };
    this._mainService.postPost(newCard)
      .subscribe(res => {
        this._router.navigate(['/']);
        console.log("Assigned id for new Post: " + JSON.stringify(res.post));
      });
  }
}
