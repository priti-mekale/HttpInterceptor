import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ipost } from 'src/app/assets/model/post';
import { PostService } from 'src/app/assets/services/post.service';
import { SnackbarService } from 'src/app/assets/services/snakbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
// postForm!: FormGroup;
// isInEditMode:boolean=false
//   constructor(
//     private postService:PostService,
//     private _snackbar:SnackbarService
//   ) { }

//   ngOnInit(): void {
//       this.postForm = new FormGroup({
//       title: new FormControl('', Validators.required),
//       body: new FormControl('', Validators.required),
//       userId: new FormControl('', [
//         Validators.required,
//         Validators.min(1)   
//       ])
//     });
//   }


// onSubmit() {
//   if (this.postForm.valid) {
//     const postObj = this.postForm.value;

//     this.postService.createPost(postObj).subscribe({
//       next: (res) => {
//         this._snackbar.openSnackbar("Added Successfully......")
//         this.postForm.reset();
//         //subject use subscribe in dasboard
//         this.postService.newPostSub$.next({...postObj,id:res.id})
//       },
//       error: (err) => {
//         console.error('Error while creating post', err);
//       }
//     });
//   }
// }


postForm!: FormGroup;
  isInEditMode: boolean = false;
  editPostId!: string;

  constructor(
    private postService: PostService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      userId: new FormControl('', [Validators.required, Validators.min(1)])
    });

    // EDIT subscription
    this.postService.editPostSubObs$.subscribe(post => {
      this.isInEditMode = true;
      this.editPostId = post.id!;

      this.postForm.patchValue({
        title: post.title,
        body: post.body,
        userId: post.userId
      });
    });
  }

  onSubmit() {
    if (this.postForm.invalid) return;

    const postObj: Ipost = this.postForm.value;

    if (!this.isInEditMode) {

      // CREATE
      this.postService.createPost(postObj).subscribe(res => {
        this._snackbar.openSnackbar('Added Successfully');
        this.postService.newPostSub$.next({ ...postObj, id: res.id });
        this.postForm.reset();
      });

    } else {

      // UPDATE
      this.postService.updatePost(this.editPostId, postObj).subscribe(() => {
        this._snackbar.openSnackbar('Updated Successfully');

        this.postService.setUpdatePost({
          ...postObj,
          id: this.editPostId
        });

        this.postForm.reset();
        this.isInEditMode = false;
      });

    }
  }


}


