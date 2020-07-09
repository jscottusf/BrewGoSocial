import { Component, OnInit } from "@angular/core";
import { BreweryService } from "../_services/savedbrewery.service";
import { User, BreweryModel } from "../_models";
import { AccountService } from "../_services";

@Component({
  selector: "app-saved-breweries",
  templateUrl: "./saved-breweries.component.html",
  styleUrls: ["./saved-breweries.component.css"],
})
export class SavedBreweriesComponent implements OnInit {
  user: User;
  userData: any;
  public breweries: BreweryModel;
  constructor(
    private breweryService: BreweryService,
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;
    this.getAllSavedBreweries(this.user.id);
  }

  ngOnInit(): void {}

  getAllSavedBreweries(id) {
    this.breweryService.getUserBreweries(id).subscribe((data) => {
      this.userData = data;
      this.breweries = this.userData.savedBreweries;
      console.log(this.breweries);
    }),
      (err) => console.log(err);
  }

  exexOnDelete($event: any) {
    this.getAllSavedBreweries(this.user.id);
  }

  exexOnRate($event: any) {
    this.getAllSavedBreweries(this.user.id);
  }
}
