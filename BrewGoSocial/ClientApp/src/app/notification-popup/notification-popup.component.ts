import { Component, OnInit } from "@angular/core";
import { User, NotificationModel } from "../_models";
import { AccountService } from "../_services";
import { NotificationService } from "../_services/notifcation.service";
import { Router } from "@angular/router";

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
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.getNotifications();
    setTimeout(() => {
      this.ngOnInit();
    }, 3000);
  }

  getNotifications() {
    this.notificationService
      .getNotificationsById(this.user.id)
      .subscribe((notifications: NotificationModel[]) => {
        this.notifications = notifications;
      });
  }

  deleteNotification(id) {
    this.notificationService.deleteNotification(id).subscribe(() => {
      this.getNotifications();
    });
  }

  navigateToUserProfile(user) {
    this.router.navigate(["users/" + user]);
  }

  navigateToPost(postId) {
    this.router.navigate(["posts/" + postId]);
  }
}
