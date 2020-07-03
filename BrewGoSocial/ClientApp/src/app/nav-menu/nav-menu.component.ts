import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent {
  @Input() user: any;
  @Output() logout = new EventEmitter();
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
