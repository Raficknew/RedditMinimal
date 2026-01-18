import { useSearchParams } from "react-router";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Suspense, useEffect, useMemo, useState } from "react";
import { SubredditsList } from "./components/SubredditsList/SubredditsList";
import { SUBREDDITS } from "./components/SubredditsList/subreddits";
import { PostList } from "./components/PostList/PostList";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  fetchInitialPosts,
  fetchSearchedPosts,
  postSelector,
} from "./store/postSlice";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [subredditEndpoint, setSubredditEndpoint] = useState<string | null>(
    null
  );
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
    dispatch(fetchInitialPosts());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      console.log(searchTerm, subredditEndpoint);
      dispatch(
        fetchSearchedPosts({ subreddit: subredditEndpoint, query: searchTerm })
      );
    }
  }, [searchTerm, subredditEndpoint, dispatch]);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <NavBar setSearchParams={setSearchParams} />
      <main className="flex flex-col md:flex-row gap-4 px-4 w-full">
        {isLoadingPosts ? (
          <p className="w-full">Loading posts...</p>
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
