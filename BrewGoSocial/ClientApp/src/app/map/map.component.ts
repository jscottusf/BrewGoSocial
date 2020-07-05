import { environment } from "../../environments/environment";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  mapbox: any = mapboxgl;
  style = "mapbox://styles/mapbox/streets-v11";
  lat = 37.75;
  lng = -122.41;
  constructor() {}

  ngOnInit() {
    this.mapbox.accessToken = environment.mapBoxAccessToken;
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });
    // Add map controls
    //display map marker
    new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(this.map);
    //allows for full screen map
    this.map.addControl(new mapboxgl.FullscreenControl());
    //allows to zoom in and zoom out map
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.scrollZoom.disable();
    //initial map is blurry, so calling resize adjusts blur
    this.map.on("load", function () {
      this.map.resize();
    });
  }
}
