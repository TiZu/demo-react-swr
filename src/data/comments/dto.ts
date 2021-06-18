export interface CommentDto {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CreateCommentDto {
  postId: number;
  name: string;
  email: string;
  body: string;
}
