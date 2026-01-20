import {
  ArrowDown02Icon,
  ArrowUp02Icon,
  Comment02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Comment } from "../Comment/Comment";
import type { Post as PostType } from "../../types/types";
import { fetchCommentsForPostById } from "../../store/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { CommentSkeleton } from "../Skeletons/CommentSkeleton";

export function Post({ post }: { post: PostType }) {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useAppDispatch();
  const [hasFetchedComments, setHasFetchedComments] = useState(false);
  const { comments, isLoadingComments, commentError } = useAppSelector(
    (state) => state.comments,
  );
  const postComments = comments[post.id] ? comments[post.id].data : [];
  const [hasPhotoError, setHasPhotoError] = useState(false);

  useEffect(() => {
    if (!hasFetchedComments && showComments) {
      dispatch(fetchCommentsForPostById(post.id)).finally(() =>
        setHasFetchedComments(true),
      );
    }
  }, [post, dispatch, hasFetchedComments, showComments]);

  return (
    <div className="flex gap-3 md:gap-6 p-4 w-full bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col items-center w-14">
        <HugeiconsIcon
          onClick={() => setIsLiked((prev) => (prev === true ? null : true))}
          className={cn(
            "cursor-pointer transition-colors",
            isLiked === true && "text-green-400",
          )}
          icon={ArrowUp02Icon}
        />
        <p
          className={cn(
            "font-bold text-sm md:text-base",
            isLiked === true && "text-green-400",
            isLiked === false && "text-red-400",
          )}
        >
          {post.likesCount}
        </p>
        <HugeiconsIcon
          onClick={() => setIsLiked((prev) => (prev === false ? null : false))}
          className={cn(
            "cursor-pointer transition-colors",
            isLiked === false && "text-red-400",
          )}
          icon={ArrowDown02Icon}
        />
      </div>

      <div className="flex flex-col w-full min-w-0">
        <h3 className="text-[#444444] font-bold text-lg leading-tight mb-3">
          {post.title}
        </h3>
        {post.pictureUrl &&
        post.pictureUrl.startsWith("https") &&
        !hasPhotoError ? (
          <div className="w-full mb-4 overflow-hidden rounded-md">
            <img
              src={post.pictureUrl}
              alt={post.title}
              onError={() => setHasPhotoError(true)}
              className="w-full h-auto max-h-128 object-contain mx-auto"
            />
          </div>
        ) : null}
        <div className="w-full">
          <div className="bg-gray-200 h-px" />
          <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-2 text-xs py-3">
            <p
              className="text-blue-700 font-semibold  max-w-30"
              title={post.author}
            >
              {post.author}
            </p>
            <p className="text-gray-400 text-center">{post.postDate}</p>

            <div
              className={cn(
                "flex items-center justify-end gap-1 cursor-pointer transition-colors hover:text-blue-700",
                showComments && "text-blue-700 font-bold",
              )}
              onClick={() => setShowComments((prev) => !prev)}
            >
              <HugeiconsIcon icon={Comment02Icon} size={16} />
              <span>{post.commentsCount}</span>
            </div>
          </div>

          {showComments && (
            <div className="mt-2 space-y-4 w-full border-t pt-4">
              {isLoadingComments &&
                !hasFetchedComments &&
                Array.from({ length: 5 }).map((_, i) => (
                  <CommentSkeleton key={i} />
                ))}

              {commentError && (
                <p className="text-red-500 text-sm text-center py-2">
                  Failed to load comments.
                </p>
              )}

              {postComments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}

              {!isLoadingComments && postComments.length > 0 && (
                <button className="text-xs text-gray-500 hover:text-blue-700 w-full text-center py-2">
                  Show more in Reddit...
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
