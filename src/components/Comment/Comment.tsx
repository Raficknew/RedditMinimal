import type { CommentType } from "../../types/types";

export function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="flex flex-col gap-2 bg-[#fcfcfc] min-h-20 p-4 hover:shadow-lg rounded-sm">
      <div className="flex md:flex-col justify-between flex-wrap">
        <p>{comment.author}</p>
        <p className="text-md italic text-gray-500">{comment.postDate}</p>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
