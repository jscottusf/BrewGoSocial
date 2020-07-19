import { Component, OnInit, ViewChild } from "@angular/core";
import { User, ProfileModel, PostModel } from "../_models";
import { AccountService, ProfileService } from "../_services";
import * as moment from "moment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  user: User;
  userData: any;
  createdDate: any;
  editProfile: boolean;
  submitted = false;
  alertShow = false;
  alertMessage = "";
  alertType = "";
  //store user data in a card to pass down to post modal
  userCard: any = {};
  public profile: ProfileModel;
  public posts: PostModel[];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private profileService: ProfileService
  ) {
    this.user = this.accountService.userValue;
    this.createdDate = moment(this.user.createdDate).format("MMMM YYYY");
    this.editProfile = false;
    //this.createdDate = moment(this.user.createdDate).fromNow();
  }

  ngOnInit(): void {
    this.getUserProfile(this.user.id);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  getUserProfile(id) {
    this.profileService.getUserProfile(id).subscribe((data) => {
      this.userData = data;
      this.profile = this.userData.profile;
      this.posts = this.userData.posts;
      this.userCard = {
        userId: this.user.id,
        profileImgUrl: this.profile.profileImgUrl,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username,
        slug: this.userData.slug,
        city: this.profile.city,
        state: this.profile.state,
      };
      this.form = this.formBuilder.group({
        profileId: this.profile.profileId,
        city: [this.profile.city, [Validators.maxLength(25)]],
        state: [this.profile.state, [Validators.maxLength(2)]],
        occupation: [this.profile.occupation, [Validators.maxLength(55)]],
        favoriteBreweries: [
          this.profile.favoriteBreweries,
          [Validators.maxLength(255)],
        ],
        favoriteBeers: [
          this.profile.favoriteBeers,
          [Validators.maxLength(255)],
        ],
        bio: [this.profile.bio, [Validators.maxLength(255)]],
        userId: this.profile.userId,
        profileImgUrl: this.profile.profileImgUrl,
      });
    }),
      (err) => console.log(err);
  }

  submitChanges() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.profileService
      .editProfile(this.profile.profileId, this.form.value)
      .subscribe(
        (res) => {
          this.editProfile = false;
          this.alertShow = true;
          this.alertMessage = "Profile Updated Successfully";
          this.alertType = "success";
          this.getUserProfile(this.profile.userId);
        },
        (err) => {
          console.log(err);
          this.alertShow = true;
          this.alertMessage = "Profile Update Failed";
          this.alertType = "danger";
        }
      );
  }

  editClick() {
    this.editProfile = !this.editProfile;
  }

  reloadPosts($event: any) {
    this.getUserProfile(this.user.id);
  }

  exexOnDismiss($event: any) {
    this.alertShow = false;
  }
}
