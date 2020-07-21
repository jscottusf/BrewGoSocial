import { CommentModel } from "../_models";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class CommentService implements OnInit {
  appurl: string = "";

  constructor(private http: HttpClient) {
    this.appurl = `${environment.apiUrl}/api/comments/`;
  }

  ngOnInit() {}

  getPostComments(id): Observable<CommentModel> {
    return this.http.get<CommentModel>(`${environment.apiUrl}/api/posts/${id}`);
  }

  getallComments(): Observable<CommentModel> {
    return this.http.get<CommentModel>(this.appurl);
  }

  getCommentById(id): Observable<CommentModel> {
    return this.http.get<CommentModel>(this.appurl + id);
  }

  postNewComment(formData: CommentModel) {
    return this.http.post(this.appurl, formData);
  }

  deleteComment(id: number) {
    return this.http.delete(this.appurl + id);
  }

  editComment(id: number, formData: CommentModel) {
    return this.http.put(this.appurl + id, formData);
  }
}
