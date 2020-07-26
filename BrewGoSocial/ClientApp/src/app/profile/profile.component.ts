import { Component, OnInit, ViewChild } from "@angular/core";
import { User, ProfileModel, PostModel } from "../_models";
import { AccountService, ProfileService } from "../_services";
import * as moment from "moment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostModalComponent } from "../post-modal/post-modal.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  @ViewChild(PostModalComponent, { static: false })
  private postModal: PostModalComponent;
  form: FormGroup;
  user: User;
  userData: any;
  createdDate: any;
  editProfile: boolean;
  submitted = false;
  alertShow = false;
  loadingImg = true;
  alertMessage = "";
  alertType = "";
  selectedFile: File = null;
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
      this.loadingImg = false;
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
      .toPromise()
      .then((res) => {
        this.editProfile = false;
        this.alertShow = true;
        this.alertMessage = "Profile Updated Successfully";
        this.alertType = "success";
        this.getUserProfile(this.profile.userId);
        this.postModal.getUserData(this.user.id);
      })
      .catch((err) => {
        console.log(err);
        this.alertShow = true;
        this.alertMessage = "Profile Update Failed";
        this.alertType = "danger";
      });
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

  onFileSelected(event) {
    this.loadingImg = true;
    this.selectedFile = event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.accountService.uploadImg(this.user.id, fd).subscribe(
      (res) => {
        this.getUserProfile(this.profile.userId);
        this.postModal.getUserData(this.user.id);
      },
      (err) => console.log(err + "something went wrong")
    );
  }

  onUpload() {
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.accountService.uploadImg(this.user.id, fd).subscribe(
      (res) => {
        this.getUserProfile(this.profile.userId);
        this.postModal.getUserData(this.user.id);
      },
      (err) => console.log(err + "something went wrong")
    );
  }
}
