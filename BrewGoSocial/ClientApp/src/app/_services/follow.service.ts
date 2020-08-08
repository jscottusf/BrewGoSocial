import { FollowModel } from "../_models";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class FollowService implements OnInit {
  appurl: string = "";

  constructor(private http: HttpClient) {
    this.appurl = `${environment.apiUrl}/api/follows/`;
  }

  ngOnInit() {}

  getUserFollows(id): Observable<FollowModel> {
    return this.http.get<FollowModel>(`${environment.apiUrl}/api/users/${id}`);
  }

  getallFollows(): Observable<FollowModel> {
    return this.http.get<FollowModel>(this.appurl);
  }

  getFollowById(id): Observable<FollowModel> {
    return this.http.get<FollowModel>(this.appurl + id);
  }

  postNewFollow(formData: FollowModel) {
    return this.http.post(this.appurl, formData);
  }

  deleteFollow(id: number) {
    return this.http.delete(this.appurl + id);
  }
}
