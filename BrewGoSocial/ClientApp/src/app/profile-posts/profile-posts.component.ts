import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "profile-posts",
  templateUrl: "./profile-posts.component.html",
  styleUrls: ["./profile-posts.component.css"],
})
export class ProfilePostsComponent implements OnInit {
  @Input() posts: any = {};
  constructor() {}

  ngOnInit(): void {}
}
