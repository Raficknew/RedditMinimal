import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { type SetURLSearchParams } from "react-router";

export function NavBar({
  setSearchParams,
}: {
  setSearchParams: SetURLSearchParams;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ searchTerm });
  };

  return (
    <header className="flex  w-full justify-between px-4 md:px-16 h-16 items-center shadow-lg">
      <h1 className="w-full">Reddit minimal</h1>
      <form
        className="flex max-w-130 w-full gap-2 items-center"
        onSubmit={onSearch}
      >
        <input
          className="bg-[#f3f3f3] w-full text-xs p-2 indent-2 rounded-sm"
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <HugeiconsIcon icon={Search01Icon} />
        </button>
      </form>
      <div className="w-full hidden md:block" />
    </header>
  );
}
