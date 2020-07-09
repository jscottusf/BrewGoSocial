import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BreweryService } from "../_services/savedbrewery.service";

@Component({
  selector: "save-icon",
  templateUrl: "./save-icon.component.html",
  styleUrls: ["./save-icon.component.css"],
})
export class SaveIconComponent implements OnInit {
  @Input() brewery = {};
  @Input() userId: number;
  breweryData: any = {};

  constructor(
    private breweryService: BreweryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  saveBrewery(brewery) {
    console.log(brewery);
    console.log(this.userId);
    this.breweryData = {
      breweryName: brewery.name,
      breweryType: brewery.brewery_type,
      street: brewery.street,
      city: brewery.city,
      state: brewery.state,
      zip: brewery.postal_code.substr(0, 5),
      phone: brewery.phone,
      url: brewery.website_url,
      rating: 0,
      userId: this.userId,
    };
    this.breweryService.postNewBrewery(this.breweryData).subscribe(
      (res) => this.router.navigate(["/saved"]),
      (err) => console.log(err)
    );
  }
}
