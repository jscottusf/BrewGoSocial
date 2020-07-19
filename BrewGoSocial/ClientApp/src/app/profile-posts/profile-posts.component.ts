import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import { PostModel } from "../_models";
import { PostService } from "../_services";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "profile-posts",
  templateUrl: "./profile-posts.component.html",
  styleUrls: ["./profile-posts.component.css"],
  providers: [NgbModalConfig, NgbModal],
})
export class ProfilePostsComponent implements OnInit {
  moment: any = moment;
  @Input() posts: any = [];
  @Output() onDelete = new EventEmitter();
  public post: PostModel;
  editForm: FormGroup;
  submitted = false;
  postData: any = {};

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  open(content) {
    this.modalService.open(content);
  }

  getPostData(id) {
    this.postService.getPostById(id).subscribe(
      (data) => {
        this.postData = data;
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
        console.log(this.editForm.value);
      },
      (err) => console.log(err)
    );
  }

  resetForm(form?: FormGroup) {
    if (form != null) form.reset();
    this.editForm = this.formBuilder.group({
      postId: "",
      profileImgUrl: "",
      postBody: "",
      userId: "",
      firstName: "",
      lastName: "",
      username: "",
      slug: "",
    });
  }

  editPost() {
    // this.submitted = true;
    // // stop here if form is invalid (only whitespace)
    // if (/\S/.test(this.form.value.postBody) === false) {
    //   return;
    // }
    console.log(this.editForm.value);
    // this.postService
    //   .editPost(this.postData.postId, this.form.value)
    //   .subscribe((res) => {
    //     this.onDelete.emit();
    //     this.resetForm();
    //   }),
    //   (err) => console.log(err);
  }

  deletePost(id) {
    this.postService.deletePost(id).subscribe(
      (res) => this.onDelete.emit(),
      (err) => console.log(err)
    );
  }
}
