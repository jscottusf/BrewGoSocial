import { Component, OnInit, Input } from "@angular/core";
import { MapService } from "../_services/mapbox.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  constructor(private map: MapService) {}
  ngOnInit() {}

  buildMap(long, lat) {
    this.map.buildMap(long, lat);
  }
}
