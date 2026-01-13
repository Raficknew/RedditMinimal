import { Post } from "../Post/Post";

export function PostList() {
  return (
    <div className="flex flex-col w-full gap-8">
      {[1, 2, 3].map((id) => (
        <Post key={id} />
      ))}
    </div>
  );
}
