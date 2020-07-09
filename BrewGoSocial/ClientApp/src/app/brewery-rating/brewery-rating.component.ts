import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BreweryService } from "../_services/savedbrewery.service";

@Component({
  selector: "brewery-rating",
  templateUrl: "./brewery-rating.component.html",
  styleUrls: ["./brewery-rating.component.css"],
})
export class BreweryRatingComponent implements OnInit {
  @Input() breweryId;
  @Input() rating: number;
  @Input() brewery: any = {};
  @Output() breweryRated = new EventEmitter();

  constructor(private breweryService: BreweryService) {}

  ngOnInit(): void {}

  rateBrewery(id, rating) {
    this.brewery.rating = rating;
    this.breweryService.editBrewery(id, this.brewery).subscribe(
      (res) => this.breweryRated.emit(),
      (err) => console.log(err)
    );
  }
}
