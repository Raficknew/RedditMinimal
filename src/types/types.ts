export type Post = {
  author: string;
  title: string;
  likesCount: number;
  commentsCount: number;
  postDate: string;
};

export type Comment = {
  author: string;
  content: string;
  postDate: string;
};
