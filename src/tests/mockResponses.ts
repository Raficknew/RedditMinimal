import type { ApiPostResponse } from "../types/responses";
import type { Post } from "../types/types";

export const posts: Post[] = [
  {
    id: "1",
    title: "First Post",
    author: "MockUser1",
    commentsCount: 10,
    likesCount: 5,
    postDate: "a month ago",
    pictureUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Second Post",
    author: "MockUser2",
    commentsCount: 20,
    likesCount: 15,
    postDate: "a month ago",
    pictureUrl: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    title: "Third Post",
    author: "MockUser3",
    commentsCount: 30,
    likesCount: 25,
    postDate: "a month ago",
    pictureUrl: "https://via.placeholder.com/150",
  },
];

export const mockRedditPostResponse: ApiPostResponse = {
  data: {
    children: [
      {
        data: {
          id: "post_1",
          author: "react_fan_1",
          title: "Why Javascript is awesome?",
          score: 1540,
          num_comments: 45,
          url_overridden_by_dest: "https://example.com/image1.jpg",
          created_utc: 1706448000,
        },
        kind: "t3",
      },
      {
        data: {
          id: "post_2",
          author: "frontend_dev",
          title: "Question about testing in javascript",
          score: 320,
          num_comments: 12,
          url_overridden_by_dest: "",
          created_utc: 1706361600,
        },
        kind: "t3",
      },
      {
        data: {
          id: "post_3",
          author: "news_bot",
          title: "New version of javascript released!",
          score: 5000,
          num_comments: 890,
          url_overridden_by_dest: "https://example.com/react-logo.png",
          created_utc: 1706275200,
        },
        kind: "t3",
      },
      {
        data: {
          id: "post_4",
          author: "junior_dev",
          title: "How to center a div? Help #css #javascript",
          score: 15,
          num_comments: 2,
          url_overridden_by_dest: "https://example.com/css-meme.jpg",
          created_utc: 1706188800,
        },
        kind: "t3",
      },
      {
        data: {
          id: "post_5",
          author: "traveler",
          title: "Photo from my trip in javascript",
          score: 2100,
          num_comments: 150,
          url_overridden_by_dest: "https://example.com/mountains.jpg",
          created_utc: 1706102400,
        },
        kind: "t3",
      },
    ],
  },
};

export const mockRedditPost2Response: ApiPostResponse = {
  data: {
    children: [
      {
        data: {
          id: "post_6",
          author: "code_master",
          title: "10 best practices in Python in 2024",
          score: 2750,
          num_comments: 60,
          url_overridden_by_dest:
            "https://example.com/python-best-practices.jpg",
          created_utc: 1706016000,
        },
        kind: "t3",
      },
      {
        data: {
          id: "post_7",
          author: "data_scientist",
          title: "Data analysis with Python - a beginner's guide",
          score: 1340,
          num_comments: 30,
          url_overridden_by_dest: "",
          created_utc: 1705929600,
        },
        kind: "t3",
      },
      {
        data: {
          id: "post_8",
          author: "ml_engineer",
          title: "Introduction to machine learning with python",
          score: 4200,
          num_comments: 120,
          url_overridden_by_dest: "https://example.com/ml-python.png",
          created_utc: 1705843200,
        },
        kind: "t3",
      },
    ],
  },
};

export const mockPost: Post = {
  id: "p1",
  author: "post_user",
  title: "Test Post Title",
  commentsCount: 5,
  likesCount: 10,
  pictureUrl: "https://example.com/image.jpg",
  postDate: "a month ago",
};
