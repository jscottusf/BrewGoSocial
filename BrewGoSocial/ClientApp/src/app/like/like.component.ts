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

  constructor() {}

  ngOnInit(): void {}
}
