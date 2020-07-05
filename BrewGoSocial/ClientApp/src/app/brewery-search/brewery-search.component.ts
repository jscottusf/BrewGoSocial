import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreweryAPIService } from "../_services/breweryAPI.service";

@Component({
  selector: "app-brewery-search",
  templateUrl: "./brewery-search.component.html",
  styleUrls: ["./brewery-search.component.css"],
})
export class BrewerySearchComponent implements OnInit {
  form: FormGroup;
  breweryData: any = [];
  city: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private breweryAPI: BreweryAPIService
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

  onSubmit() {
    this.brewerySearch(this.form.value.brewerySearch);
  }
}
