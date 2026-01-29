import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/post';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  patchValue(arg0: { title: string; body: string; userId: string; }) {
    throw new Error('Method not implemented.');
  }

newPostSub$:Subject<Ipost>=new Subject<Ipost>()
private editPostSub$:Subject <Ipost>=new Subject<Ipost>()
editPostSubObs$:Observable<Ipost>=this.editPostSub$.asObservable()
removePost$ = new Subject<string>();
private updatePostSub$:Subject<Ipost>=new Subject<Ipost>()
updatePostSubObj$:Observable<Ipost>=this.updatePostSub$.asObservable()
 // Base URL from environment
  BASE_URL: string = environment.Base_url;


  setEditPost(post:Ipost){
    this.editPostSub$.next(post)
  }

  setUpdatePost(post :Ipost){
    this.updatePostSub$.next(post)
  }
  // Firebase posts endpoint
  POST_URL: string = `${this.BASE_URL}posts.json`;

  constructor(private _http: HttpClient) {}

  // Fetch all posts
  fetchPosts() {
    return this._http.get<any>(this.POST_URL);
  }

   // Create a post
  createPost(postData: Ipost): Observable<Ipost> {
    return this._http.post<Ipost>(this.POST_URL, postData);
  }

  //remove a post

removePost(id: string) {
  return this._http.delete(`${this.BASE_URL}posts/${id}.json`);
}


updatePost(id: string, post: Ipost) {
  return this._http.patch(`${this.BASE_URL}posts/${id}.json`, post);
}


}
