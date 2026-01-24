import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ipost } from 'src/app/assets/model/post';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { PostService } from 'src/app/assets/services/post.service';
import { filter, Subject, switchMap } from 'rxjs';
import { SnackbarService } from 'src/app/assets/services/snakbar.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
@Input() postObj!:Ipost

  constructor(  private _matDialog: MatDialog,
    private _postService:PostService,
    private _snakbar:SnackbarService
     ) { }

  ngOnInit(): void {
  }


onRemove() {
  const config = new MatDialogConfig();
  config.data = 'Are you sure you want to delete this post?';
  config.width = '300px';

  const dialogRef = this._matDialog.open(GetConfirmComponent, config);

  dialogRef.afterClosed()
    .pipe(
      filter(res => res === true),
      switchMap(() => this._postService.removePost(this.postObj.id!))
    )
    .subscribe({
      next: () => {
        this._snakbar.openSnackbar('Post deleted');
        this._postService.removePost$.next(this.postObj.id!);
      },
      error: () => {
        this._snakbar.openSnackbar('Delete failed');
      }
    });
}



}
