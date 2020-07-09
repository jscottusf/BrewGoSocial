import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbAlertConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"],
})
export class AlertComponent {
  @Input() public alerts: Array<string> = [];
  @Input() alertShow: boolean;
  @Input() alertMessage: string;
  @Input() alertType: string;
  @Output() onDismiss = new EventEmitter();

  constructor(alertConfig: NgbAlertConfig) {
    // customize default values of alerts used by this component tree
    alertConfig.type = "success";
    alertConfig.dismissible = true;
  }
}
