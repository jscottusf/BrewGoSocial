import { BreweryModel } from "../_models/brewery";
import { HttpClient } from "@angular/common/http";
import { Inject, OnInit } from "@angular/core";
import { Observable, fromEventPattern } from "rxjs";

export class BookService implements OnInit {
  appurl: string = "";

  constructor(private http: HttpClient, @Inject("BASE_URL") _baseurl: string) {
    this.appurl = _baseurl + "api/breweries/";
  }

  ngOnInit() {}

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
