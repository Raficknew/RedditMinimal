import {
  ArrowDown02Icon,
  ArrowUp02Icon, // Poprawiony import (było ArrowUp02FreeIcons)
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoadingBox } from "./LoadingBox";

export function PostSkeleton() {
  return (
    <div className="flex gap-3 md:gap-6 p-4 w-full bg-white shadow-md rounded-lg animate-pulse">
      <div className="flex flex-col items-center shrink-0">
        <HugeiconsIcon icon={ArrowUp02Icon} className="text-gray-200" />
        <div className="py-1">
          <LoadingBox height="h-5" width="w-6" />
        </div>
        <HugeiconsIcon icon={ArrowDown02Icon} className="text-gray-200" />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <LoadingBox height="h-5" width="w-3/4" />

        <div className="w-full mb-4">
          <LoadingBox height="h-48 md:h-64" width="w-full" />
        </div>
        <div className="w-full mt-auto">
          <div className="bg-gray-100 h-px" />
          <div className="flex justify-between items-center py-3">
            <LoadingBox height="h-4" width="w-20" />
            <LoadingBox height="h-4" width="w-16" />
            <div className="flex items-center gap-1">
              <LoadingBox height="h-4" width="w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
