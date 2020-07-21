import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, PostModel, CommentModel } from "../_models";
import { PostService, CommentService, AccountService } from "../_services";
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
  public comments: CommentModel[];
  public post: PostModel;

  constructor(
    private accountService: AccountService,
    private postService: PostService,
    private commentService: CommentService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.accountService.userValue;
    this.postId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getPostData(this.postId);
  }

  getPostData(id) {
    this.postService
      .getPostById(id)
      .toPromise()
      .then((data) => {
        this.post = data;
        this.comments = data.comments;
        console.log(this.comments);
      })
      .catch((err) => console.log(err));
  }

  exexOnComment() {
    this.getPostData(this.postId);
  }
}
