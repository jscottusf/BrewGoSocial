import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreweryAPIService } from "../_services/breweryAPI.service";
import { MapService } from "../_services/mapbox.service";

@Component({
  selector: "app-brewery-search",
  templateUrl: "./brewery-search.component.html",
  styleUrls: ["./brewery-search.component.css"],
})
export class BrewerySearchComponent implements OnInit {
  form: FormGroup;
  breweryData: any = [];
  brewery: any = {};
  address: string = "";
  city: string = "";
  state: string = "";
  zip: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private breweryAPI: BreweryAPIService,
    private mapBox: MapService
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

  handleClick(address, city, state, zip, brewery) {
    this.brewery = brewery;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    console.log(brewery);
    this.mapBox.getLocation(address, city, state, zip);
  }

  onSubmit() {
    this.brewerySearch(this.form.value.brewerySearch);
  }
}
