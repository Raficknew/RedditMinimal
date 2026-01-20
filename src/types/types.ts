import type { IconSvgElement } from "@hugeicons/react";

export type Post = {
  id: string;
  author: string;
  title: string;
  likesCount: number;
  commentsCount: number;
  pictureUrl: string;
  postDate: string;
};

export type CommentType = {
  id: string;
  author: string;
  content: string;
  postDate: string;
};

export type Subreddit = {
  name: string;
  endpoint: string;
  icon: IconSvgElement;
};
