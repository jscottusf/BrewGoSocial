import { LikeModel } from "../_models";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class LikeService implements OnInit {
  appurl: string = "";

  constructor(private http: HttpClient) {
    this.appurl = `${environment.apiUrl}/api/likes/`;
  }

  ngOnInit() {}

  getPostLikes(id): Observable<LikeModel> {
    return this.http.get<LikeModel>(`${environment.apiUrl}/api/posts/${id}`);
  }

  getallLikes(): Observable<LikeModel> {
    return this.http.get<LikeModel>(this.appurl);
  }

  getLikeById(id): Observable<LikeModel> {
    return this.http.get<LikeModel>(this.appurl + id);
  }

  postNewLike(formData: LikeModel) {
    return this.http.post(this.appurl, formData);
  }

  deleteLike(id: number) {
    return this.http.delete(this.appurl + id);
  }
}
