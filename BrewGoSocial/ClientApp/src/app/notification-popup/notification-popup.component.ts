import { Component, OnInit } from "@angular/core";
import { User, NotificationModel } from "../_models";
import { AccountService } from "../_services";
import { NotificationService } from "../_services/notifcation.service";

@Component({
  selector: "notification-popup",
  templateUrl: "./notification-popup.component.html",
  styleUrls: ["./notification-popup.component.css"],
})
export class NotificationPopupComponent implements OnInit {
  user: User;
  notifications: NotificationModel[];

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService
      .getNotificationsById(this.user.id)
      .subscribe((notifications: NotificationModel[]) => {
        console.log(notifications);
        this.notifications = notifications;
      });
  }
}
