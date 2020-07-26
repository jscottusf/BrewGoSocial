import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

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
import { AlertComponent } from "./alert/alert.component";
import { BreweryRatingComponent } from "./brewery-rating/brewery-rating.component";
import { ProfileComponent } from "./profile/profile.component";
import { StateInputComponent } from "./state-input/state-input.component";
import { PostModalComponent } from "./post-modal/post-modal.component";
import { ProfilePostsComponent } from "./profile-posts/profile-posts.component";
import { ProfileService, PostService, CommentService } from "./_services";
import { PublicProfileComponent } from "./public-profile/public-profile.component";
import { PostPageComponent } from "./post-page/post-page.component";
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { CommentEllipsisComponent } from './comment-ellipsis/comment-ellipsis.component';
import { SocialPageComponent } from './social-page/social-page.component';
import { SocialFeedComponent } from './social-feed/social-feed.component';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
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
    AlertComponent,
    BreweryRatingComponent,
    ProfileComponent,
    StateInputComponent,
    PostModalComponent,
    ProfilePostsComponent,
    PublicProfileComponent,
    PostPageComponent,
    CommentModalComponent,
    CommentEllipsisComponent,
    SocialPageComponent,
    SocialFeedComponent,
    UserSearchComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    BreweryAPIService,
    MapService,
    ZomatoService,
    BreweryService,
    ProfileService,
    PostService,
    CommentService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
