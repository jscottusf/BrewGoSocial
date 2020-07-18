import { Component, OnInit, Input } from "@angular/core";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "post-modal",
  templateUrl: "./post-modal.component.html",
  styleUrls: ["./post-modal.component.css"],
  providers: [NgbModalConfig, NgbModal],
})
export class PostModalComponent implements OnInit {
  @Input() userCard: any = {};
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(content) {
    this.modalService.open(content);
  }
}
