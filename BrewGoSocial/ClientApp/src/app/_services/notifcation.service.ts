import { NotificationModel } from "../_models";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class NotificationService implements OnInit {
  appurl: string = "";

  constructor(private http: HttpClient) {
    this.appurl = `${environment.apiUrl}/api/notifications/`;
  }

  ngOnInit() {}

  getNotificationsById(id) {
    return this.http.get(this.appurl + id);
  }

  deleteNotification(id: number) {
    return this.http.delete(this.appurl + id);
  }
}
