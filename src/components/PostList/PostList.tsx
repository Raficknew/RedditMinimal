import type { Post } from "../../types/types";
import { PostCard } from "../PostCard/PostCard";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col w-full gap-8 pb-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
