import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "../../lib/utils";
import type { Subreddit } from "../../types/types";

export function SubredditsList({
  subreddits,
  selectedSubreddit,
  onSubredditClick,
}: {
  subreddits: Subreddit[];
  selectedSubreddit: string | null;
  onSubredditClick: (endpoint: string) => void;
}) {
  return (
    <aside className="flex max-h-300 flex-col w-full md:w-125 p-4 bg-white shadow-lg">
      <h2 className="text-2xl text-[#444444] font-semibold">Subreddits</h2>
      {subreddits.map((subreddit) => (
        <Subreddit
          key={subreddit.name}
          selected={selectedSubreddit === subreddit.endpoint}
          onClick={() => onSubredditClick(subreddit.endpoint)}
          subreddit={subreddit}
        />
      ))}
    </aside>
  );
}

function Subreddit({
  subreddit,
  selected,
  onClick,
}: {
  subreddit: Subreddit;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer h-13 hover:bg-gray-100 gap-2",
        selected &&
          "bg-indigo-400 border-l-5 text-indigo-700 hover:bg-indigo-400 font-semibold border-indigo-700 pl-3",
      )}
    >
      <HugeiconsIcon icon={subreddit.icon} />
      {subreddit.name}
    </div>
  );
}
