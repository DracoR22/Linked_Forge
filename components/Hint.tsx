import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface HintProps {
    children: React.ReactNode
    description: string
    side?: "left" | "right" | "top" | "bottom"
    sideOffset?: number
}

const Hint = ({ children , description, side, sideOffset = 0 }: HintProps) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            {children}
          </TooltipTrigger>
          <TooltipContent sideOffset={sideOffset} side={side} className="text-xs max-w-[220px] break-words">
            {description}
          </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default Hint