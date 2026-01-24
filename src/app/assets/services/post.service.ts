import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/post';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

newPostSub$:Subject<Ipost>=new Subject<Ipost>()

removePost$ = new Subject<string>();
 // Base URL from environment
  BASE_URL: string = environment.Base_url;

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


}
