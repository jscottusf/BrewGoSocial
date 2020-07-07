import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ZomatoService {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getRestaurants(latitude, longitude) {
    const headers = {
      "content-type": "application/json",
      "user-key": environment.zomatoApiToken,
    };

    const requestOptions = { headers: new HttpHeaders(headers) };
    const zomatoAPI =
      "https://developers.zomato.com/api/v2.1/search?q=food&count=20&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&radius=2500&establishment_type=restaurant&sort=real_distance&order=asc";
    return this.http.get(zomatoAPI, requestOptions);
  }
}
