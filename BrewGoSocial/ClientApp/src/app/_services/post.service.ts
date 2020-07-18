import { PostModel } from "../_models";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class PostService implements OnInit {
  appurl: string = "";

  constructor(private http: HttpClient) {
    this.appurl = `${environment.apiUrl}/api/posts/`;
  }

  ngOnInit() {}

  getUserPosts(id): Observable<PostModel> {
    return this.http.get<PostModel>(`${environment.apiUrl}/api/users/${id}`);
  }

  getallPosts(): Observable<PostModel> {
    return this.http.get<PostModel>(this.appurl);
  }

  getPostById(id): Observable<PostModel> {
    return this.http.get<PostModel>(this.appurl + id);
  }

  postNewPost(formData: PostModel) {
    return this.http.post(this.appurl, formData);
  }

  deletePost(id: number) {
    return this.http.delete(this.appurl + id);
  }

  editPost(id: number, formData: PostModel) {
    return this.http.put(this.appurl + id, formData);
  }
}
