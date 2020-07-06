import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { environment } from "../../environments/environment";
import { compileNgModule } from "@angular/compiler";

@Injectable({
  providedIn: "root",
})
export class MapService {
  latitude;
  longitude;
  map: mapboxgl.Map;
  mapbox: any = mapboxgl;
  style = "mapbox://styles/mapbox/streets-v11";
  zoom = 13;
  constructor(private http: HttpClient) {
    this.mapbox.accessToken = environment.mapBoxAccessToken;
  }

  getLocation(address, city, state, zip) {
    if (this.map) {
      this.map.remove();
    }
    var locationSearch =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURI(address) +
      "%20" +
      encodeURI(city) +
      "%20" +
      encodeURI(state) +
      "%20" +
      encodeURI(zip) +
      ".json?access_token=" +
      environment.mapBoxAccessToken;
    return this.http.get(locationSearch).subscribe(
      (res: any) => {
        this.latitude = res.features[0].center[1];
        this.longitude = res.features[0].center[0];
        this.buildMap(this.longitude, this.latitude);
        //display map marker
        new mapboxgl.Marker()
          .setLngLat([this.longitude, this.latitude])
          .addTo(this.map);
        //allows for full screen map
        this.map.addControl(new mapboxgl.FullscreenControl());
        //allows to zoom in and zoom out map
        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.scrollZoom.disable();
        this.map.resize();
        setTimeout(() => this.map.resize(), 500);
      },
      (err) => console.log(err)
    );
  }

  buildMap(long, lat) {
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: this.zoom,
      center: [long, lat],
    });
  }
}
