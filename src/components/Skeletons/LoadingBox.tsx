import { cn } from "../../lib/utils";

export function LoadingBox({
  height = "h-4",
  width = "w-full",
}: {
  height?: string;
  width?: string;
}) {
  return (
    <div
      className={cn("animate-pulse bg-gray-100 rounded-md", height, width)}
    />
  );
}
