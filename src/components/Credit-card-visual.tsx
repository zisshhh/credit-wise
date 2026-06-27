import { cn } from "@/lib/utils"
import type { CardData } from "@/types" 
import { Wifi } from "lucide-react"

const themeStyles: Record<CardData, string> = {
  indigo: "from-indigo-900 via-indigo-700 to-indigo-500 text-white",
  emerald: "from-emerald-900 via-emerald-700 to-emerald-500 text-white",
  slate: "from-slate-900 via-slate-700 to-slate-600 text-white",
  sky: "from-sky-900 via-sky-700 to-sky-500 text-white",
  amber: "from-amber-700 via-amber-600 to-amber-400 text-white",
  rose: "from-rose-900 via-rose-700 to-rose-500 text-white",
}
interface CreditCardVisualProps {
  name: string
  issuer: string
  theme: CardData
  className?: string
}

export function CreditCardVisual({ name, issuer, theme, className }: CreditCardVisualProps) {
  return (
    <div
      className={cn( "relative flex aspect-[1.586/1] w-full flex-col justify-between overflow-hidden rounded-xl bg-linear-to-br p-5 shadow-lg",
        themeStyles[theme],
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full bg-white/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-12 -left-6 size-32 rounded-full bg-white/5" aria-hidden="true" />

      <div className="flex items-start justify-between">
        <span className="font-heading text-sm font-bold tracking-tight">{issuer}</span>
        <Wifi className="size-5 rotate-90 opacity-80" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="h-7 w-10 rounded-md bg-white/30 ring-1 ring-white/40" aria-hidden="true" />
        <p className="font-mono text-sm tracking-[0.2em] opacity-90">
          {"•••• •••• •••• 0247"}
        </p>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="font-heading text-sm font-semibold leading-tight text-balance">{name}</span>
        <span className="font-heading text-xs font-bold italic opacity-90">CARDLY</span>
      </div>
    </div>
  )
}
