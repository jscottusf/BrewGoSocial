import { Component, OnInit } from "@angular/core";
import { PostService } from "../_services";
import { PostModel } from "../_models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "social-feed",
  templateUrl: "./social-feed.component.html",
  styleUrls: ["./social-feed.component.css"],
})
export class SocialFeedComponent implements OnInit {
  public posts: PostModel[];
  form: FormGroup;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {
    this.getPublicPosts();
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formBuilder.group({
      postsSearch: ["", Validators.required],
    });
  }

  getPublicPosts() {
    this.postService
      .getallPosts()
      .toPromise()
      .then((data) => (this.posts = data))
      .catch((err) => console.log(err));
  }

  explorePosts(query) {
    this.postService
      .searchPosts(query)
      .toPromise()
      .then((data) => (this.posts = data))
      .catch((err) => console.log(err));
  }

  onSubmit() {
    console.log(this.form.value.postsSearch);
    this.explorePosts(this.form.value.postsSearch);
  }

  exexOnSubmit($event: any) {
    this.getPublicPosts();
  }
}
