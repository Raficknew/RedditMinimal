import {
  ArrowDown02Icon,
  ArrowUp02FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoadingBox } from "./LoadingBox";

export function PostSkeleton() {
  return (
    <div className="flex gap-6 p-6 w-full bg-white shadow-md hover:shadow-xl rounded-lg">
      <div className="flex flex-col items-center w-12">
        <HugeiconsIcon icon={ArrowUp02FreeIcons} />
        <LoadingBox height="h-6" />
        <HugeiconsIcon icon={ArrowDown02Icon} />
      </div>
      <div className="flex flex-col w-full justify-between min-h-25">
        <LoadingBox height="h-6" />

        <LoadingBox height="h-10" />
        <div>
          <div className="bg-gray-200 h-px *:" />
          <div className="flex justify-between text-xs p-2">
            <LoadingBox width="w-25" />
            <LoadingBox width="w-25" />
            <LoadingBox width="w-25" />
          </div>
        </div>
      </div>
    </div>
  );
}
