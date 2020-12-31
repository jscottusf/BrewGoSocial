import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, PostModel, CommentModel } from "../_models";
import {
  PostService,
  CommentService,
  AccountService,
  LikeService,
} from "../_services";
import * as moment from "moment";

@Component({
  selector: "app-post-page",
  templateUrl: "./post-page.component.html",
  styleUrls: ["./post-page.component.css"],
})
export class PostPageComponent implements OnInit {
  moment: any = moment;
  submitted = false;
  user: User;
  postId: string;
  showElipsis: boolean;
  public comments: CommentModel[];
  public post: PostModel;
  public editForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe((res) => {
      this.postId = res.id;
      this.user = this.accountService.userValue;
      this.getPostData(this.postId);
    });
  }

  ngOnInit(): void {}

  getPostData(id) {
    this.postService
      .getPostById(id)
      .toPromise()
      .then((data) => {
        this.post = data;
        console.log(this.post.userId, this.user.id);
        this.showElipsis = this.post.userId === parseInt(this.user.id);
        this.comments = data.comments;
        this.setForm();
      })
      .catch((err) => console.log(err));
  }

  exexOnComment() {
    this.getPostData(this.postId);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  setForm(editForm?: FormGroup) {
    if (editForm != null) editForm.reset();
    this.editForm = this.formBuilder.group({
      postId: this.post.postId,
      profileImgUrl: this.post.profileImgUrl,
      postBody: [this.post.postBody, [Validators.minLength(1)]],
      userId: this.post.userId,
      firstName: this.post.firstName,
      lastName: this.post.lastName,
      username: this.post.username,
      slug: this.post.slug,
    });
  }

  submitChanges() {
    this.submitted = true;
    // stop here if form is invalid (only whitespace)
    if (/\S/.test(this.editForm.value.postBody) === false) {
      return;
    }
    this.postService
      .editPost(this.post.postId, this.editForm.value)
      .subscribe((res) => {
        this.getPostData(this.postId);
      }),
      (err) => console.log(err);
  }

  deletePost(id) {
    this.postService.deletePost(id).subscribe(
      (res) => this.router.navigate(["/profile"]),
      (err) => console.log(err)
    );
  }

  unLikePost(id) {
    this.likeService
      .deleteLike(id)
      .toPromise()
      .then((res) => {
        this.getPostData(this.postId);
      });
  }

  open(content) {
    this.modalService.open(content);
  }
}
