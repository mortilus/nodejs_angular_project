import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MainService } from '../main.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  private postId: string;
  public editPostForm: FormGroup;

  constructor(private route: ActivatedRoute, private _mainService: MainService, private _formBuilder: FormBuilder) {
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
        }); //...
      }
    });
  }

  public saveChanges() {
    console.log("Saving changes for: " + this.editPostForm.get('titleForm').value);
  }
}
