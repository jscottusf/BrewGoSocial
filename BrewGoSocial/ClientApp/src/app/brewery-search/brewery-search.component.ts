import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreweryAPIService } from "../_services/breweryAPI.service";
import { MapService } from "../_services/mapbox.service";
import { ZomatoService } from "../_services/zomato.service";

@Component({
  selector: "app-brewery-search",
  templateUrl: "./brewery-search.component.html",
  styleUrls: ["./brewery-search.component.css"],
})
export class BrewerySearchComponent implements OnInit {
  form: FormGroup;
  breweryData: any = [];
  brewery: any = {};
  city: string = "";
  areaCode: number;
  prefix: number;
  lineNum: number;
  zip: number;
  restaurants: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private breweryAPI: BreweryAPIService,
    private mapBox: MapService,
    private zomato: ZomatoService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      brewerySearch: ["", Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  brewerySearch(query) {
    this.breweryAPI.searchBreweryAPI(query).subscribe(
      (data) => {
        this.breweryData = data;
        this.city = this.breweryAPI.city;
      },
      (err) => console.log(err)
    );
  }

  handleClick(brewery) {
    this.brewery = brewery;
    console.log(this.brewery);
    this.mapBox.getLocation(
      brewery.street,
      brewery.city,
      brewery.state,
      brewery.postal_code
    );
    this.areaCode = brewery.phone.substr(0, 3);
    this.prefix = brewery.phone.substr(3, 3);
    this.lineNum = brewery.phone.substr(6, 4);
    this.zip = brewery.postal_code.substr(0, 5);
    setTimeout(
      () =>
        this.zomato
          .getRestaurants(this.mapBox.latitude, this.mapBox.longitude)
          .subscribe(
            (data) => (this.restaurants = data),
            (err) => console.log(err)
          ),
      250
    );
  }

  onSubmit() {
    this.brewerySearch(this.form.value.brewerySearch);
  }
}
