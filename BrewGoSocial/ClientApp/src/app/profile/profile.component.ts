import { Component, OnInit } from "@angular/core";
import { User, ProfileModel } from "../_models";
import { AccountService, ProfileService } from "../_services";
import * as moment from "moment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User;
  userData: any;
  createdDate: any;
  alertShow = false;
  alertMessage = "";
  alertType = "";
  public profile: ProfileModel;

  constructor(
    private accountService: AccountService,
    private profileService: ProfileService
  ) {
    this.user = this.accountService.userValue;
    this.createdDate = moment(this.user.createdDate).format("MMMM YYYY");
    //this.createdDate = moment(this.user.createdDate).fromNow();
  }

  ngOnInit(): void {
    this.getUserProfile(this.user.id);
  }

  getUserProfile(id) {
    this.profileService.getUserProfile(id).subscribe((data) => {
      this.userData = data;
      this.profile = this.userData.profile;
    }),
      (err) => console.log(err);
  }
}
