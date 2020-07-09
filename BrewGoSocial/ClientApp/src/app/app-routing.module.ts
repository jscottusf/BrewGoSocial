import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home";
import { AuthGuard } from "./_helpers";
import { AlertComponent } from "./_components";
import { BrewerySearchComponent } from "./brewery-search/brewery-search.component";
import { SavedBreweriesComponent } from "./saved-breweries/saved-breweries.component";

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
    path: "account",
    loadChildren: accountModule,
  },
  {
    path: "saved",
    component: SavedBreweriesComponent,
    canActivate: [AuthGuard],
  },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
