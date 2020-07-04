import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { states } from "../_helpers/states";

@Injectable({
  providedIn: "root",
})
export class BreweryAPIService implements OnInit {
  query: string = "";
  city: string = "";
  state: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  fixCityCapitalization(str: any) {
    str = str
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    this.city = str;
  }

  searchBreweryAPI(query: any) {
    query = query.split(",");
    this.city = query[0];
    this.fixCityCapitalization(this.city);
    if (query[1] === undefined) {
      this.state = "";
    } else if (query[1].length === 2 || query[1].length === 3) {
      var ref = query[1].trim().toUpperCase();
      this.state = states[ref];
    } else {
      this.state = query[1].trim();
    }
    return this.http.get(
      "https://api.openbrewerydb.org/breweries?per_page=50&by_city=" +
        encodeURI(this.city) +
        "&by_state=" +
        encodeURI(this.state) +
        "&sort=type,-name"
    );
  }
}
