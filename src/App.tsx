import { useSearchParams } from "react-router";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { useMemo, useState } from "react";
import { SubredditsList } from "./components/SubredditsList/SubredditsList";
import { SUBREDDITS } from "./components/SubredditsList/subreddits";
import { PostList } from "./components/PostList/PostList";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [subredditEndpoint, setSubredditEndpoint] = useState<string | null>(
    null
  );

  const searchTerm = useMemo(() => {
    return searchParams.get("searchTerm");
  }, [searchParams]);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <NavBar setSearchParams={setSearchParams} />
      <main className="flex flex-col md:flex-row gap-4 px-4 w-full">
        <PostList />
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
