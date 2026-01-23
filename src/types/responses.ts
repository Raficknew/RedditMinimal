export interface ApiPostResponse {
  data: {
    children: Array<{
      kind: string;
      data: {
        id: string;
        author: string;
        title: string;
        score: number;
        num_comments: number;
        url_overridden_by_dest: string;
        created_utc: number;
      };
    }>;
  };
}

export interface RedditApiResponse {
  kind: string;
  data: {
    children: Array<{
      kind: string;
      data: {
        id: string;
        author: string;
        body: string;
        created_utc: number;
      };
    }>;
  };
}
