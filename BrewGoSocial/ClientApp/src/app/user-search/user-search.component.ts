import { Component, OnInit } from "@angular/core";
import { AccountService } from "../_services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../_models";

@Component({
  selector: "user-search",
  templateUrl: "./user-search.component.html",
  styleUrls: ["./user-search.component.css"],
})
export class UserSearchComponent implements OnInit {
  user: User;
  form: FormGroup;
  searchResults: User[];

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formBuilder.group({
      userSearch: ["", Validators.required],
    });
  }

  onSubmit() {
    this.userSearch(this.form.value.userSearch);
    console.log(this.searchResults);
  }

  userSearch(query) {
    this.accountService
      .queryUserNames(query)
      .toPromise()
      .then((data) => (this.searchResults = data))
      .catch((err) => console.log(err));
  }
}
