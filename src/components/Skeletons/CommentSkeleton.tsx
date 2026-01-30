import { LoadingBox } from "./LoadingBox";

export function CommentSkeleton() {
  return (
    <div
      data-testid="comment-skeleton"
      className="flex flex-col gap-2 bg-[#fcfcfc] min-h-20 p-4 hover:shadow-lg rounded-sm"
    >
      <div className="flex justify-between">
        <LoadingBox width="w-20" />
        <LoadingBox width="w-20" />
      </div>
      <LoadingBox height="h-15" />
    </div>
  );
}
