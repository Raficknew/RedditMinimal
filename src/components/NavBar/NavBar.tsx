import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function NavBar() {
  return (
    <header className="flex  w-full justify-between px-16 h-16 items-center shadow-lg">
      <p className="w-full">Reddit minimal</p>
      <div className="flex max-w-130 w-full gap-2 items-center">
        <input
          className="bg-[#f3f3f3] w-full text-xs p-2 indent-2 rounded-sm"
          type="text"
          placeholder="Search"
        />
        <HugeiconsIcon icon={Search01Icon} />
      </div>
      <div className="w-full hidden md:block" />
    </header>
  );
}
