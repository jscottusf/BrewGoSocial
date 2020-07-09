import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { BrewerySearchComponent } from "./brewery-search/brewery-search.component";
import { MapComponent } from "./map/map.component";
import { SavedBreweriesComponent } from "./saved-breweries/saved-breweries.component";

import { AppRoutingModule } from "./app-routing.module";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { BreweryAPIService } from "./_services/breweryAPI.service";
import { MapService } from "./_services/mapbox.service";
import { ZomatoService } from "./_services/zomato.service";
import { BreweryService } from "./_services/savedbrewery.service";
import { SaveIconComponent } from "./save-icon-component/save-icon.component";
import { RemoveIconComponent } from "./remove-icon-component/remove-icon.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    BrewerySearchComponent,
    MapComponent,
    SavedBreweriesComponent,
    SaveIconComponent,
    RemoveIconComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    BreweryAPIService,
    MapService,
    ZomatoService,
    BreweryService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
