import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor, ErrorInterceptor } from "../_helpers";

import { AccountRoutingModule } from "./account-routing.module";
import { LayoutComponent } from "./layout.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AccountRoutingModule],
  declarations: [LayoutComponent, LoginComponent, RegisterComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AccountModule {}
