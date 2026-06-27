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
        <div className="w-full sm:w-[340px] bg-white/5 backdrop-blur-xl shadow-xl ring-1 ring-white/10 text-white rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">

            <div className="relative h-48 bg-linear-to-br from-zinc-900 to-black rounded-t-3xl overflow-hidden">
                <img
                    src={image}
                    alt={cardName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />

                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    {rating}
                </div>

                {isPremuim && (
                    <div className="absolute top-4 left-4 bg-linear-to-r from-amber-500 via-yellow-400 to-amber-300 text-black text-xs font-bold px-3 py-1 rounded-xl shadow-lg shadow-amber-500/30">
                        PREMIUM
                    </div>
                )}
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
                            {/* <p>{rewards.rate}</p>
                            <p>{rewards.details}</p> */}
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
                                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                            >
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
                        className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
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