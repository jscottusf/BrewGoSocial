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
  public user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.slug = this.route.snapshot.paramMap.get("slug");
  }

  ngOnInit(): void {
    this.getProfileBySlug(this.slug);
  }

  getProfileBySlug(slug) {
    this.accountService
      .getBySlug(slug)
      .toPromise()
      .then((data) => {
        this.user = data;
        console.log(this.user);
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(["/"]);
      });
  }
}
