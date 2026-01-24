import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/assets/services/post.service';
import { SnackbarService } from 'src/app/assets/services/snakbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
postForm!: FormGroup;
  constructor(
    private postService:PostService,
    private _snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
      this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      userId: new FormControl('', [
        Validators.required,
        Validators.min(1)   
      ])
    });
  }


onSubmit() {
  if (this.postForm.valid) {
    const postObj = this.postForm.value;

    this.postService.createPost(postObj).subscribe({
      next: (res) => {
        this._snackbar.openSnackbar("Added Successfully......")
        this.postForm.reset();
        //subject use subscribe in dasboard
        this.postService.newPostSub$.next({...postObj,id:res.id})
      },
      error: (err) => {
        console.error('Error while creating post', err);
      }
    });
  }
}}


