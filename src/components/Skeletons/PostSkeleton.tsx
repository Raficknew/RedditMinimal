import {
  ArrowDown02Icon,
  ArrowUp02FreeIcons,
  Comment02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoadingBox } from "./LoadingBox";

export function PostSkeleton() {
  return (
    <div className="flex gap-6 p-6 w-full bg-white shadow-md hover:shadow-xl rounded-lg">
      <div className="flex flex-col items-center w-12">
        <HugeiconsIcon icon={ArrowUp02FreeIcons} />
        <LoadingBox />
        <HugeiconsIcon icon={ArrowDown02Icon} />
      </div>
      <div className="flex flex-col w-full justify-between min-h-25">
        <h3 className="text-[#444444] font-bold text-lg">Loading title...</h3>

        <div className="h-10" />
        <div>
          <div className="bg-gray-200 h-px *:" />
          <div className="flex justify-between text-xs p-2">
            <p className="text-blue-700 font-semibold">Loading author...</p>
            <LoadingBox />
            <div className="flex gap-2">
              <HugeiconsIcon icon={Comment02Icon} size={16} />
              <LoadingBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
