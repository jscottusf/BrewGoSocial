export class PostModel {
  postId: number;
  postBody: string;
  profileImgUrl: string;
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  slug: string;
  comments: any = [];
  createdDate: string;
  updatedDate: string;
}
