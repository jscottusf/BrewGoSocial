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
  //user data is packaged for consumption by the profile post component
  userCard: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.slug = this.route.snapshot.paramMap.get("slug");
    this.profileViewer = this.accountService.userValue;
    this.getProfileBySlug(this.slug);
  }

  ngOnInit(): void {}

  getProfileBySlug(slug) {
    this.accountService
      .getBySlug(slug)
      .toPromise()
      .then((data) => {
        this.user = data;
        //this.getViewerData(this.profileViewer.id);
        // this.userCard = {
        //   userId: this.user.id,
        //   profileImgUrl: this.user.profileImgUrl,
        //   firstName: this.user.firstName,
        //   lastName: this.user.lastName,
        //   username: this.user.username,
        //   slug: this.user.slug,
        //   city: this.user.city,
        //   state: this.user.state,
        // };
        console.log(this.user);
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(["/"]);
      });
  }

  // getViewerData(id) {
  //   this.accountService
  //     .getById(id)
  //     .toPromise()
  //     .then((data) => {
  //       console.log(data);
  //       this.userCard = {
  //         userId: data.id,
  //         profileImgUrl: data.profile.profileImgUrl,
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         username: data.username,
  //         slug: data.slug,
  //         city: data.profile.city,
  //         state: data.profile.state,
  //       };
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.router.navigate(["/"]);
  //     });
  // }

  exexOnSubmit() {
    this.getProfileBySlug(this.slug);
  }
}
