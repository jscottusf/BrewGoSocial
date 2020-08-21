import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LikeModel, PostModel, User } from "../_models";
import { LikeService, AccountService } from "../_services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "like",
  templateUrl: "./like.component.html",
  styleUrls: ["./like.component.css"],
})
export class LikeComponent implements OnInit {
  @Input() postCard: PostModel;
  @Output() onLike = new EventEmitter();
  public likeModel: LikeModel;
  public viewer: User;
  public user: any = {};
  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private likeService: LikeService,
    private formBuilder: FormBuilder
  ) {
    this.viewer = this.accountService.userValue;
  }

  ngOnInit(): void {}

  setForm(form?: FormGroup) {
    if (form != null) form.reset();
    this.form = this.formBuilder.group({
      userId: this.viewer.id,
      posterId: this.postCard.userId,
      postId: this.postCard.postId,
    });
  }

  likePost() {
    this.likeService
      .postNewLike(this.form.value)
      .toPromise()
      .then((res) => {
        this.onLike.emit();
        this.setForm();
      })
      .catch((err) => console.log(err));
  }
}
