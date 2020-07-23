import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommentModel, PostModel, User } from "../_models";
import { CommentService, AccountService } from "../_services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "comment-modal",
  templateUrl: "./comment-modal.component.html",
  styleUrls: ["./comment-modal.component.css"],
})
export class CommentModalComponent implements OnInit {
  @Input() postCard: PostModel;
  @Output() onComment = new EventEmitter();
  public commentModel: CommentModel;
  public viewer: User;
  public user: any = {};
  form: FormGroup;
  submitted = false;

  constructor(
    private accountService: AccountService,
    private commentService: CommentService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.viewer = this.accountService.userValue;
  }

  ngOnInit(): void {
    //person viewing the post, retrieve thier data by id in order to make post
    this.getUserData(this.viewer.id);
  }

  getUserData(id) {
    this.accountService
      .getById(id)
      .toPromise()
      .then((data) => {
        console.log(data);
        //user === person making the comment
        this.user = {
          userId: data.id,
          profileImgUrl: data.profile.profileImgUrl,
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          slug: data.slug,
          city: data.profile.city,
          state: data.profile.state,
        };
        this.setForm();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setForm(form?: FormGroup) {
    if (form != null) form.reset();
    this.form = this.formBuilder.group({
      profileImgUrl: this.user.profileImgUrl,
      commentBody: ["", [Validators.minLength(1)]],
      userId: this.user.userId,
      originalPosterId: this.postCard.userId,
      postId: this.postCard.postId,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      slug: this.user.slug,
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  open(content) {
    this.modalService.open(content);
  }

  makeComment() {
    this.submitted = true;
    console.log(this.form.value);
    // stop here if form is invalid (only whitespace)
    if (/\S/.test(this.form.value.commentBody) === false) {
      return;
    }
    this.commentService
      .postNewComment(this.form.value)
      .toPromise()
      .then((res) => {
        this.onComment.emit();
        this.setForm();
      })
      .catch((err) => console.log(err));
  }
}
