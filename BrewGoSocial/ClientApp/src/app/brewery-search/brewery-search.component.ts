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

  onSubmit() {
    console.log(this.form.value.brewerySearch);
    this.breweryAPI.searchBreweryAPI(this.form.value.brewerySearch);
  }
}
