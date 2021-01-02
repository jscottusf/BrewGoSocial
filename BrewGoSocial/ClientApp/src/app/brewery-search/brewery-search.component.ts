import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreweryAPIService } from "../_services/breweryAPI.service";
import { BreweryService } from "../_services/savedbrewery.service";
import { MapService } from "../_services/mapbox.service";
import { ZomatoService } from "../_services/zomato.service";
import { AccountService } from "../_services";
import { User } from "../_models";
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: "app-brewery-search",
  templateUrl: "./brewery-search.component.html",
  styleUrls: ["./brewery-search.component.css"],
})
export class BrewerySearchComponent implements OnInit {
  //Open BreweryAPI IDs
  apiIds: any[];
  //Saved Brewery DeleteIds
  deleteIds: any[];

  alertShow = false;
  savedBreweryList: any;
  alertMessage;
  alertType;
  user: User;
  form: FormGroup;
  breweryData: any;
  brewery: any;
  city: string = "";
  areaCode: number;
  prefix: number;
  lineNum: number;
  zip: number;
  restaurants: any[];
  foodDisplayCount: number = 0;

  constructor(
    private accountService: AccountService,
    private breweryService: BreweryService,
    private formBuilder: FormBuilder,
    private breweryAPI: BreweryAPIService,
    private mapBox: MapService,
    private zomato: ZomatoService
  ) {
    this.user = this.accountService.userValue;
  }

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
        //allows for bootstrap expansion cards to be collapsed or not
        this.breweryData.map((brewery) => (brewery.isCollapsed = true));
        this.city = this.breweryAPI.city;
        this.getSavedBreweries();
      },
      (err) => console.log(err)
    );
  }

  closeAllCards(i) {
    this.breweryData.forEach((brewery, index) => {
      if (!brewery.isCollapsed && i !== index) {
        brewery.isCollapsed = true;
      }
    });
  }

  getSavedBreweries() {
    this.breweryService.getUserBreweries(this.user.id).subscribe((res) => {
      this.savedBreweryList = res;
      //store all open brewery api ids in an array
      this.apiIds = this.savedBreweryList.savedBreweries.map((brewery) => {
        return brewery.apiId;
      });
      //also store the database Ids into an array to delete them if needed
      //The index should be the same for each, making the delete method easier
      this.deleteIds = this.savedBreweryList.savedBreweries.map((brewery) => {
        return brewery.breweryId;
      });
    }),
      (err) => console.log(err);
  }

  handleClick(brewery) {
    this.brewery = brewery;
    this.mapBox
      .getLocation(
        brewery.street,
        brewery.city,
        brewery.state,
        brewery.postal_code
      )
      .subscribe(
        (res: any) => {
          let latitude = res.features[0].center[1];
          let longitude = res.features[0].center[0];
          this.mapBox.buildMap(longitude, latitude);
          //display map marker
          new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(this.mapBox.map);
          //allows for full screen map
          this.mapBox.map.addControl(new mapboxgl.FullscreenControl());
          //allows to zoom in and zoom out map
          this.mapBox.map.addControl(new mapboxgl.NavigationControl());
          this.mapBox.map.scrollZoom.disable();
          //this.map.resize(); is done with after a half second timeout
          setTimeout(() => this.mapBox.map.resize(), 250);
          this.zomato.getRestaurants(latitude, longitude).subscribe(
            (data: any) => {
              this.restaurants = data.restaurants;
              this.foodDisplayCount = 0;
            },
            (err) => console.log(err)
          );
        },
        (err) => console.log(err)
      );
    this.areaCode = brewery.phone.substr(0, 3);
    this.prefix = brewery.phone.substr(3, 3);
    this.lineNum = brewery.phone.substr(6, 4);
    this.zip = brewery.postal_code.substr(0, 5);
  }

  leftClick() {
    this.foodDisplayCount -= 2;
    if (this.foodDisplayCount < 0) {
      this.foodDisplayCount = this.restaurants.length - 2;
    }
  }

  rightClick() {
    this.foodDisplayCount += 2;
    if (this.foodDisplayCount >= this.restaurants.length) {
      this.foodDisplayCount = 0;
    }
  }

  onSubmit() {
    this.brewerySearch(this.form.value.brewerySearch);
  }

  exexOnSave($event: any, name) {
    event.stopPropagation();
    this.brewerySearch(this.city);
    this.alertType = "success";
    this.alertMessage = name + " added to favorites list";
    this.alertShow = true;
  }

  deleteBrewery(event, id, name) {
    event.stopPropagation();
    this.breweryService.deleteBrewery(id).subscribe(
      (res) => {
        this.brewerySearch(this.city);
        this.alertType = "danger";
        this.alertMessage = name + "  removed from favorites list";
        this.alertShow = true;
      },
      (err) => console.log(err)
    );
  }

  exexOnSaveError($event: any) {
    this.brewerySearch(this.city);
    this.alertType = "danger";
    this.alertMessage = $event;
    this.alertShow = true;
  }

  exexOnDismiss($event: any) {
    this.alertShow = false;
  }
}
