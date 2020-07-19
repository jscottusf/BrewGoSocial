import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PostModel } from "../_models";
import { PostService } from "../_services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "post-modal",
  templateUrl: "./post-modal.component.html",
  styleUrls: ["./post-modal.component.css"],
  providers: [NgbModalConfig, NgbModal],
})
export class PostModalComponent implements OnInit {
  @Input() userCard: any = {};
  @Output() onPost = new EventEmitter();
  public post: PostModel;
  form: FormGroup;
  submitted = false;

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: FormGroup) {
    if (form != null) form.reset();
    this.form = this.formBuilder.group({
      profileImgUrl: this.userCard.profileImgUrl,
      postBody: ["", [Validators.minLength(1)]],
      userId: this.userCard.userId,
      firstName: this.userCard.firstName,
      lastName: this.userCard.lastName,
      username: this.userCard.username,
      slug: this.userCard.slug,
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  open(content) {
    this.modalService.open(content);
  }

  makePost() {
    this.submitted = true;
    // stop here if form is invalid (only whitespace)
    if (/\S/.test(this.form.value.postBody) === false) {
      return;
    }
    this.postService.postNewPost(this.form.value).subscribe((res) => {
      this.onPost.emit();
      this.resetForm();
    }),
      (err) => console.log(err);
  }
}
