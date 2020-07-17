import { ProfileModel } from "../_models/";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class ProfileService implements OnInit {
  appurl: string = "";

  constructor(private http: HttpClient) {
    this.appurl = `${environment.apiUrl}/api/profiles/`;
  }

  ngOnInit() {}

  getUserProfile(id): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${environment.apiUrl}/api/users/${id}`);
  }

  getallProfiles(): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(this.appurl);
  }

  getProfileById(id): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(this.appurl + id);
  }

  postNewProfile(formData: ProfileModel) {
    return this.http.post(this.appurl, formData);
  }

  deleteProfile(id: string) {
    return this.http.delete(this.appurl + id);
  }

  editProfile(id: string, formData: ProfileModel) {
    return this.http.put(this.appurl + id, formData);
  }
}
