import type { Comment as CommentType } from "../../types/types";

export function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="flex flex-col gap-2 bg-[#fcfcfc] min-h-20 p-4 hover:shadow-lg rounded-sm">
      <div className="flex justify-between">
        <div>
          <p>{comment.author}</p>
        </div>
        <p className="text-md italic text-gray-500">{comment.postDate}</p>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
