export type CommentDto = {
  id: string;
  userId: string;
  postId: string;
  text: string;
};
export type ThoughtDto = {
  id: string;
  userId: string;
  postId: string;
  thoughts: string[];
};
export type PostDto = {
  id: string;
  username: string;
  userImg?: string;
  title: string;
  content: any[];
  categories: string[];
  tags: string[];
  reads: number;
  createdAt: string;
  updatedAt: string;
};
export type PostWithNoUserDto = {
  id: string;
  title: string;
  content: any[];
  categories: string[];
  tags: string[];
  reads: number;
  createdAt: string;
  updatedAt: string;
};
