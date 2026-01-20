import {
  ArrowDown02Icon,
  ArrowUp02Icon,
  Comment02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Comment } from "../Comment/Comment";
import type {
  Comment as CommentType,
  Post as PostType,
} from "../../types/types";
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
  const postComments: CommentType[] = comments[post.id]
    ? comments[post.id].data
    : [];

  useEffect(() => {
    if (!hasFetchedComments && showComments) {
      dispatch(fetchCommentsForPostById(post.id)).finally(() =>
        setHasFetchedComments(true),
      );
    }
  }, [post, dispatch, hasFetchedComments, showComments]);

  return (
    <div className="flex gap-6 p-6 w-full bg-white shadow-md hover:shadow-xl rounded-lg">
      <div className="flex flex-col items-center w-12">
        <HugeiconsIcon
          onClick={() =>
            setIsLiked((prevValue) => (prevValue === true ? null : true))
          }
          className={cn("cursor-pointer", isLiked === true && "text-green-400")}
          icon={ArrowUp02Icon}
        />
        <p
          className={cn(
            isLiked === true && "text-green-400",
            isLiked === false && "text-red-400",
          )}
        >
          {post.likesCount}
        </p>
        <HugeiconsIcon
          onClick={() =>
            setIsLiked((prevValue) => (prevValue === false ? null : false))
          }
          className={cn("cursor-pointer", isLiked === false && "text-red-400")}
          icon={ArrowDown02Icon}
        />
      </div>
      <div className="flex flex-col w-full justify-between min-h-25">
        <h3 className="text-[#444444] font-bold text-lg">{post.title}</h3>

        {post.pictureUrl && post.pictureUrl.startsWith("http") ? (
          <img
            src={post.pictureUrl}
            alt={post.title}
            className="flex w-full h-full min-h-10 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-10" />
        )}
        <div>
          <div className="bg-gray-200 h-px *:" />
          <div className="flex justify-between flex-wrap text-xs p-2">
            <p className="text-blue-700 font-semibold w-25">{post.author}</p>
            <p className="text-gray-400">{post.postDate}</p>
            <div
              className={cn(
                "flex items-center justify-end gap-1 cursor-pointer w-25",
                showComments && "text-blue-700",
              )}
              onClick={() => setShowComments((prev) => !prev)}
            >
              <HugeiconsIcon
                className={cn(
                  "cursor-pointer",
                  showComments && "text-blue-700",
                )}
                icon={Comment02Icon}
                size={16}
              />
              <p>{post.commentsCount}</p>
            </div>
          </div>
          {isLoadingComments &&
            showComments &&
            Array.from({ length: 12 }).map((_, index) => (
              <CommentSkeleton key={index} />
            ))}
          {showComments && postComments && (
            <div className="flex flex-col gap-8">
              {postComments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
              })}
              <p className="self-center">More...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
