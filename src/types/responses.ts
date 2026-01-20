interface ApiPostData {
  id: string;
  author: string;
  title: string;
  score: number;
  num_comments: number;
  thumbnail: string;
  created_utc: number;
}

interface ApiPostChild {
  data: ApiPostData;
  kind: string;
}

export interface ApiPostResponse {
  data: {
    children: ApiPostChild[];
  };
}
