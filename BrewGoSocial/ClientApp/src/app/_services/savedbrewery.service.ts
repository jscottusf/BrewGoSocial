import { BreweryModel } from "../_models/brewery";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class BreweryService implements OnInit {
  appurl: string = "";

  constructor(private http: HttpClient) {
    this.appurl = `${environment.apiUrl}/api/breweries/`;
  }

  ngOnInit() {}

  getUserBreweries(id): Observable<BreweryModel> {
    return this.http.get<BreweryModel>(`${environment.apiUrl}/api/users/${id}`);
  }

  getallBreweries(): Observable<BreweryModel> {
    return this.http.get<BreweryModel>(this.appurl);
  }

  getBreweryById(id): Observable<BreweryModel> {
    return this.http.get<BreweryModel>(this.appurl + id);
  }

  postNewBrewery(formData: BreweryModel) {
    return this.http.post(this.appurl, formData);
  }

  deleteBrewery(id: number) {
    return this.http.delete(this.appurl + id);
  }

  editBrewery(id: number, formData: BreweryModel) {
    return this.http.put(this.appurl + id, formData);
  }
}
