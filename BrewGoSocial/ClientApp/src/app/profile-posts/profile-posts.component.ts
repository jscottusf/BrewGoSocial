import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, PostModel } from "../_models";
import { PostService, AccountService, LikeService } from "../_services";
import * as moment from "moment";

@Component({
  selector: "profile-posts",
  templateUrl: "./profile-posts.component.html",
  styleUrls: ["./profile-posts.component.css"],
  providers: [NgbModalConfig, NgbModal],
})
export class ProfilePostsComponent implements OnInit {
  moment: any = moment;
  @Input() posts: any = [];
  @Output() onSubmit = new EventEmitter();
  public post: PostModel;
  public editForm: FormGroup;
  submitted = false;
  postData: any = {};
  user: User;

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    private likeService: LikeService,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.setForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  getPostData(id) {
    this.postService
      .getPostById(id)
      .toPromise()
      .then((data) => {
        this.postData = data;
        this.setForm();
        console.log(this.editForm.value);
      })
      .catch((err) => console.log(err));
  }

  setForm(editForm?: FormGroup) {
    if (editForm != null) editForm.reset();
    this.editForm = this.formBuilder.group({
      postId: this.postData.postId,
      profileImgUrl: this.postData.profileImgUrl,
      postBody: [this.postData.postBody, [Validators.minLength(1)]],
      userId: this.postData.userId,
      firstName: this.postData.firstName,
      lastName: this.postData.lastName,
      username: this.postData.username,
      slug: this.postData.slug,
    });
  }

  submitChanges() {
    this.submitted = true;
    // stop here if form is invalid (only whitespace)
    if (/\S/.test(this.editForm.value.postBody) === false) {
      return;
    }
    console.log(this.editForm.value);
    this.postService
      .editPost(this.postData.postId, this.editForm.value)
      .subscribe((res) => {
        this.onSubmit.emit();
        this.setForm();
      }),
      (err) => console.log(err);
  }

  deletePost(id) {
    this.postService.deletePost(id).subscribe(
      (res) => this.onSubmit.emit(),
      (err) => console.log(err)
    );
  }

  unLikePost(id) {
    this.likeService
      .deleteLike(id)
      .toPromise()
      .then((res) => {
        this.onSubmit.emit();
      })
      .catch((err) => console.log(err));
  }

  open(content) {
    this.modalService.open(content);
  }

  exexOnLike() {
    this.onSubmit.emit();
  }
}
