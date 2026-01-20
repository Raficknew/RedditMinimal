export type Post = {
  id: string;
  author: string;
  title: string;
  likesCount: number;
  commentsCount: number;
  pictureUrl: string;
  postDate: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  postDate: string;
};
