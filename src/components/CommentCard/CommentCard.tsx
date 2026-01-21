import type { Comment } from "../../types/types";

export function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="flex flex-col gap-2 bg-[#fcfcfc] p-4 hover:shadow-lg rounded-sm">
      <div className="flex flex-col md:flex-row justify-between">
        <p>{comment.author}</p>
        <p className="text-md italic text-gray-500">{comment.postDate}</p>
      </div>
      <p className="wrap-break-word">{comment.content}</p>
    </div>
  );
}
