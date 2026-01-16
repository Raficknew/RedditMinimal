import { useSearchParams } from "react-router";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Suspense, useEffect, useMemo, useState } from "react";
import { SubredditsList } from "./components/SubredditsList/SubredditsList";
import { SUBREDDITS } from "./components/SubredditsList/subreddits";
import { PostList } from "./components/PostList/PostList";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchInitialPosts, postSelector } from "./store/postSlice";

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

  useEffect(() => {
    dispatch(fetchInitialPosts());
  }, [dispatch]);

  // useEffect(() => {
  //   fetch("https://www.reddit.com/r/Polska/hot.json?limit=10")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPosts(data.data.children.map((child) => child.data));
  //     });
  // }, []);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <NavBar setSearchParams={setSearchParams} />
      <main className="flex flex-col md:flex-row gap-4 px-4 w-full">
        {isLoadingPosts ? (
          <p className="w-full">Loading posts...</p>
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
