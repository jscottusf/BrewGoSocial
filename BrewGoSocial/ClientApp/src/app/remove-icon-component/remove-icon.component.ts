import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BreweryService } from "../_services/savedbrewery.service";

@Component({
  selector: "remove-icon",
  templateUrl: "./remove-icon.component.html",
  styleUrls: ["./remove-icon.component.css"],
})
export class RemoveIconComponent implements OnInit {
  @Input() breweryId;
  @Output() onDeleteBrewery = new EventEmitter();

  constructor(private breweryService: BreweryService) {}

  ngOnInit(): void {}

  deleteBrewery(id) {
    this.breweryService.deleteBrewery(id).subscribe(
      (res) => this.onDeleteBrewery.emit(),
      (err) => console.log(err)
    );
  }
}
