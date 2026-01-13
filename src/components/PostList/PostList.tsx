import { Post } from "../Post/Post";

const POSTS = [
  {
    author: "Auto Moderator",
    postDate: "a month ago",
    title: "Making Friends Monday! Share your game tags here!",
    likesCount: 34,
    commentsCount: 25,
  },
  {
    author: "User123",
    postDate: "2 weeks ago",
    title: "Check out this cool game!",
    likesCount: 12,
    commentsCount: 4,
  },
  {
    author: "GamerGal",
    postDate: "3 days ago",
    title: "Looking for teammates for co-op missions.",
    likesCount: 8,
    commentsCount: 2,
  },
];

export function PostList() {
  return (
    <div className="flex flex-col w-full gap-8">
      {POSTS.map((post) => (
        <Post key={post.title} post={post} />
      ))}
    </div>
  );
}
