"use client"

import type { CreditCardDivProps } from "@/types"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export const CardDiv = ({
    image,
    cardName,
    bankName,
    annualFee,
    minIncome,
    isPremuim,
    rating,
    benefits,
    rewards,
    summary
}: CreditCardDivProps) => {
    const [showSummary, setShowSummary] = useState(false);

    return (
        <div className="w-full sm:w-[340px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-white backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-purple-500/10">

            {/* Header */}
            <div className="relative bg-linear-to-br from-zinc-900 via-black to-zinc-950 px-5 pt-4 pb-2">

                {/* Top Row */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">

                    {isPremuim ? (
                        <div className="flex items-center gap-2 rounded-full border border-yellow-400/30 bg-linear-to-r from-yellow-400 via-amber-300 to-yellow-500 px-3 py-1 shadow-lg shadow-yellow-500/20">
                            <span className="h-2 w-2 rounded-full bg-black" />
                            <span className="text-[11px] font-bold tracking-[0.18em] text-black">
                                PREMIUM
                            </span>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-1 backdrop-blur-md">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-sm font-semibold">{rating}</span>
                    </div>
                </div>


                {/* <div className="mt-10 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 scale-110 rounded-full bg-purple-500/20 blur-3xl" />

                        <img
                            src={image}
                            alt={cardName}
                            className="relative w- drop-shadow-[0_18px_30px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </div> */}
            </div>

            <div className="p-5 sm:p-6 flex flex-col gap-4">
                <div>
                    <div className="text-xl font-bold leading-tight">{cardName}</div>
                    <div className="text-gray-400 text-sm mt-0.5">{bankName}</div>
                </div>

                <div className="flex justify-between bg-white/5 rounded-2xl p-4">
                    <div>
                        <div className="text-xs text-gray-400">Annual Fee</div>
                        <div className="font-semibold text-lg">₹{annualFee}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-400">Min Income</div>
                        <div className="font-semibold text-lg">{minIncome}</div>
                    </div>
                </div>

                {rewards && (
                    <div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">Rewards</div>
                        <div className="text-sm font-medium text-emerald-400"> {rewards}
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="mb-3 text-sm font-semibold text-white">
                        Key Benefits
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {benefits?.map((b, i) => (
                            <div
                                key={i}
                                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                                <div className="rounded-lg bg-white/10 p-1.5 group-hover:scale-110 transition-transform">
                                    {b.icon}
                                </div>

                                <span className="text-sm font-medium text-gray-200">
                                    {b.lable}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-2">
                    <button
                        onClick={() => setShowSummary(!showSummary)}
                        className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        <span>Card Summary</span>
                        {showSummary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showSummary && (
                        <div className="mt-3 text-sm leading-relaxed text-gray-300 border-l-2 border-white/20 pl-3">
                            {summary}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}