import type { Post as PostType } from "../../types/types";
import { Post } from "../Post/Post";

export function PostList({ posts }: { posts: PostType[] }) {
  return (
    <div className="flex flex-col w-full gap-8 pb-5">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
