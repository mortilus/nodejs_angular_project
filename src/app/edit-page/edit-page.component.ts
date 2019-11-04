import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MainService } from '../main.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ICard } from '../home/home.component';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  private postId: string;
  public editPostForm: FormGroup;

  constructor(private route: ActivatedRoute, private _mainService: MainService, private _formBuilder: FormBuilder, private _router: Router) {
    this.editPostForm = this._formBuilder.group({
      titleForm: [''],
      contentForm: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.postId = paramMap.get('id');
        this._mainService.getPostById(this.postId).subscribe(res => {
          console.log("RES: " + JSON.stringify(res));
          this.editPostForm = this._formBuilder.group({
            titleForm: [res.title],
            contentForm: [res.content]
          });
        });
      }
    });
  }

  public saveChanges() {
    const editedPost: ICard = {
      id: this.postId,
      title: this.editPostForm.get('titleForm').value,
      content: this.editPostForm.get('contentForm').value
    }
    this._mainService.editPostById(editedPost)
      .subscribe(res => {
        console.log("Message: " + res.message);
        this._router.navigate(["/"]);
      });
    console.log("Saving changes for: " + this.editPostForm.get('titleForm').value);
  }
}
