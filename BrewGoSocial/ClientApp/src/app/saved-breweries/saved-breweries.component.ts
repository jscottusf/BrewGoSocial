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
  alertShow = false;
  alertMessage = "";
  alertType = "";
  public breweries: BreweryModel[];

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
    }),
      (err) => console.log(err);
  }

  exexOnDelete($event: any, name) {
    this.getAllSavedBreweries(this.user.id);
    this.alertType = "danger";
    this.alertMessage = name + " removed from favorites";
    this.alertShow = true;
  }

  exexOnRate($event: any) {
    this.getAllSavedBreweries(this.user.id);
  }

  exexOnDismiss($event: any) {
    this.alertShow = false;
  }
}
