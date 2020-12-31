import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "../_services";
import { User } from "../_models";
import * as moment from "moment";

@Component({
  selector: "app-public-profile",
  templateUrl: "./public-profile.component.html",
  styleUrls: ["./public-profile.component.css"],
})
export class PublicProfileComponent implements OnInit {
  slug: string;
  moment: any = moment;
  //user was a bad idea for a var name, And I need to change the var name to something else like publicProfileUser, etc
  public user: User;
  //profile viewer is the person using the app and viewing the pages
  //this allows to have a new post component only if you're the owner of the page
  profileViewer: any;

  constructor(
    private router: Router,
    route: ActivatedRoute,
    private accountService: AccountService
  ) {
    route.params.subscribe((res) => {
      this.slug = res.slug;
      this.profileViewer = this.accountService.userValue;
      this.getProfileBySlug(this.slug);
    });
  }

  ngOnInit(): void {}

  getProfileBySlug(slug) {
    this.accountService
      .getBySlug(slug)
      .toPromise()
      .then((data) => {
        this.user = data;
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(["/"]);
      });
  }

  exexOnSubmit() {
    this.getProfileBySlug(this.slug);
  }
}
