import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home";
import { AuthGuard } from "./_helpers";
import { BrewerySearchComponent } from "./brewery-search/brewery-search.component";
import { SavedBreweriesComponent } from "./saved-breweries/saved-breweries.component";
import { ProfileComponent } from "./profile/profile.component";
import { PublicProfileComponent } from "./public-profile/public-profile.component";
import { ProfilePostsComponent } from "./profile-posts/profile-posts.component";
import { PostPageComponent } from "./post-page/post-page.component";
import { SocialPageComponent } from "./social-page/social-page.component";

const accountModule = () =>
  import("./account/account.module").then((x) => x.AccountModule);
const usersModule = () =>
  import("./users/users.module").then((x) => x.UsersModule);

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "search",
    component: BrewerySearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "saved",
    component: SavedBreweriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "users/:slug",
    component: PublicProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "posts/:id",
    component: PostPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "social",
    component: SocialPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "account",
    loadChildren: accountModule,
  },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
