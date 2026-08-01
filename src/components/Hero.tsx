import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, ShieldCheck, Star } from "lucide-react"
import { CreditCardVisual } from "./Credit-card-visual"

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary),transparent_88%),transparent)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-14 md:pb-20 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Find the credit card that actually fits you
          </h1>

          <p className="max-w-md text-base text-gray-400 leading-relaxed text-pretty">
            The Only platform for all your credit card related doubts
            Get resolved all your credit card and finance related doubts powered by AI
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 px-6 text-base">
              <Link href="/cards">
                Available Cards
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild className="h-11 px-6 text-base">
              <Link href="/learn">Credit School</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square">
            <div className="absolute left-2 top-4 w-[78%] -rotate-6">
              <CreditCardVisual issuer="Northwind Financial" name="Unlimited Cash" theme="emerald" />
            </div>
            <div className="absolute right-2 top-0 w-[78%] rotate-6">
              <CreditCardVisual issuer="Atlas Express" name="SkyMiles Plus" theme="sky" />
            </div>
            <div className="absolute bottom-6 left-1/2 w-[82%] -translate-x-1/2">
              <CreditCardVisual issuer="Vertex Bank" name="Sapphire Reserve" theme="indigo" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
