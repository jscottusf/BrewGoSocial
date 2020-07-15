import { Component, OnInit } from "@angular/core";
import { User, ProfileModel } from "../_models";
import { AccountService, ProfileService } from "../_services";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User;
  userData: any;
  alertShow = false;
  alertMessage = "";
  alertType = "";
  public profile: ProfileModel;

  constructor(
    private accountService: AccountService,
    private profileService: ProfileService
  ) {
    this.user = this.accountService.userValue;
    this.getUserProfile(this.user.id);
  }

  ngOnInit(): void {}

  getUserProfile(id) {
    this.profileService.getUserProfile(id).subscribe((data) => {
      this.userData = data;
      this.profile = this.userData.profile;
    }),
      (err) => console.log(err);
  }
}
