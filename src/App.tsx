import { useSearchParams } from "react-router";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { useMemo } from "react";
import { SubredditsList } from "./components/SubredditsList/SubredditsList";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = useMemo(() => {
    return searchParams.get("searchTerm");
  }, [searchParams]);

  return (
    <div className="flex flex-col w-full h-screen gap-4">
      <NavBar setSearchParams={setSearchParams} />
      <main className="flex flex-col sm:flex-row gap-4 px-4 w-full">
        <div className="w-full bg-white shadow-lg">Redits</div>
        <SubredditsList />
      </main>
    </div>
  );
}

export default App;
