﻿export class User {
  id: string;
  email: string;
  username: string;
  slug: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  posts: any = [];
  savedBreweries: any = [];
  profile: any = {};
  createdDate: string;
  updatedDate: string;
}
