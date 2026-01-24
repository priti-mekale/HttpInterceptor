import { Component, OnInit } from '@angular/core';
import { Ipost } from 'src/app/assets/model/post';
import { PostService } from 'src/app/assets/services/post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
postsArr!:Array<Ipost>
  constructor(private _PostService:PostService) { }

  ngOnInit(): void {
this.getAllPosts()
this._PostService.newPostSub$.subscribe(obj=>{
  this.postsArr.unshift(obj)
})
  }


  getAllPosts(){
   this._PostService.fetchPosts().subscribe({
    next:data=>{
      let arr=[]
      for(const key in data){
        arr.push({...data[key],id:key})
      }
      this.postsArr=arr
    }
   })
  }


  

}
