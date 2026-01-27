import type { Comment } from "../../types/types";

export function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div
      data-testid="comment-card"
      className="flex flex-1 min-w-0 flex-col max-w-full p-4  bg-white shadow-md hover:shadow-xl rounded-lg"
    >
      <div className="flex justify-between flex-col md:flex-row">
        <p>{comment.author}</p>
        <p className="text-md italic text-gray-500">{comment.postDate}</p>
      </div>
      <div className="w-full">
        <p className="break-all ">{comment.content}</p>
      </div>
    </div>
  );
}
