import { useSearchParams } from "react-router";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { useEffect, useMemo, useState } from "react";
import { SubredditsList } from "./components/SubredditsList/SubredditsList";
import { SUBREDDITS } from "./components/SubredditsList/subreddits";
import { PostList } from "./components/PostList/PostList";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchPosts, postSelector } from "./store/postSlice";
import { PostSkeleton } from "./components/Skeletons/PostSkeleton";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [subredditEndpoint, setSubredditEndpoint] =
    useState<string>("r/popular");
  const { posts, isLoadingPosts, postError } = useAppSelector(postSelector);
  const dispatch = useAppDispatch();

  const searchTerm = useMemo(() => {
    return searchParams.get("searchTerm");
  }, [searchParams]);

  const errorMessage =
    postError && searchTerm !== ""
      ? `No posts found for ${searchTerm}`
      : "Error while loading posts";

  useEffect(() => {
    dispatch(
      fetchPosts({ subreddit: subredditEndpoint, query: searchTerm || "new" }),
    );
  }, [searchTerm, subredditEndpoint, dispatch]);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <NavBar setSearchParams={setSearchParams} />
      <main className="flex flex-col md:flex-row gap-4 px-4 w-full">
        {isLoadingPosts ? (
          <div className="flex flex-col w-full gap-8">
            {Array.from({ length: 20 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        ) : postError ? (
          <p className="w-full">{errorMessage}</p>
        ) : (
          <PostList posts={posts} />
        )}

        <SubredditsList
          subreddits={SUBREDDITS.categories}
          selectedSubreddit={subredditEndpoint}
          onSubredditClick={setSubredditEndpoint}
        />
      </main>
    </div>
  );
}

export default App;
