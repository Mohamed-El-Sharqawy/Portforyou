import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface CustomTooltipProps {
  content?: string;
  children: React.ReactNode;
}

export default function CustomTooltip({
  content = "Enhance Content",
  children,
}: CustomTooltipProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className="absolute -top-2 right-0 z-[99999]">
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <span>{content}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
