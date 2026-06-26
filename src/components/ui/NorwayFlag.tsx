import { cn } from "@/lib/utils";

type NorwayFlagProps = {
  className?: string;
};

export function NorwayFlag({ className }: NorwayFlagProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-block h-4 w-6 overflow-hidden rounded-[3px] bg-[#BA0C2F] shadow-sm ring-1 ring-white/40",
        className,
      )}
    >
      <span className="absolute inset-y-0 left-[29%] w-[26%] bg-white" />
      <span className="absolute inset-x-0 top-[34%] h-[32%] bg-white" />
      <span className="absolute inset-y-0 left-[35%] w-[14%] bg-[#00205B]" />
      <span className="absolute inset-x-0 top-[41%] h-[18%] bg-[#00205B]" />
    </span>
  );
}
