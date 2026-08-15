"use client"

import type { CreditCardDivProps } from "@/types"
import { Star, BadgeDollarSign } from "lucide-react"
import { SummaryModel } from "./SummaryModel"

export const CardDiv = ({
    cardName,
    bankName,
    annualFee,
    minIncome,
    isPremium,
    rating,
    benefits,
    rewards,
    summary
}: CreditCardDivProps) => {

    return (
        <div className="w-full h-full bg-white/0 shadow-lg ring-1 ring-black/5 text-white rounded-2xl p-4 sm:p-6 flex flex-col border border-white/20">
            <div className="grow flex flex-col gap-3 sm:gap-4">
                <div className="h-7 flex justify-between items-center shrink-0">
                    {isPremium ? (
                        <span className="bg-linear-to-r from-amber-500 via-yellow-400 to-amber-300 text-black text-xs font-semibold px-2 sm:px-3 py-1 rounded-md shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300">
                            PREMIUM
                        </span>
                    ) : (
                        <div className="h-6"/>
                    )}
                    <span className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                        <Star className="w-4 h-4 fill-yellow-300 stroke-yellow-400" />
                        {rating}
                    </span>
                </div>

                <div className="h-16 sm:h-20 flex flex-col justify-start shrink-0">
                    <div className="text-base sm:text-lg font-semibold leading-tight line-clamp-2">{cardName}</div>
                    <div className="text-xs sm:text-sm text-gray-300 mt-1">{bankName}</div>
                </div>

                <div className="h-14 sm:h-16 flex justify-between items-start pt-1 shrink-0">
                    <div className="flex flex-col justify-start">
                        <div className="text-xs text-gray-400">Annual Fee</div>
                        <div className="font-semibold text-sm sm:text-base">
                            {typeof annualFee === "number" ? `₹${annualFee}` : annualFee}
                        </div>
                    </div>
                    <div className="flex flex-col items-end text-right max-w-[60%] justify-start">
                        <div className="text-xs text-gray-400">Min Income</div>
                        <div className="font-semibold text-xs sm:text-sm leading-tight line-clamp-2">{minIncome}</div>
                    </div>
                </div>

                <div className="h-16 sm:h-20 bg-white/10 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 shrink-0">
                    <BadgeDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-green-400 mb-0.5">Rewards</div>
                        <div className="text-xs text-white leading-tight line-clamp-2">{rewards}</div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-start min-h-[110px] sm:min-h-[130px] pt-1">
                    <div className="text-sm font-medium mb-1.5 sm:mb-2">Key Benefits</div>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {benefits.map((b, i) => (
                            <span key={i} className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-white/90 text-black rounded-full text-xs font-medium border border-white/10">
                                {b.icon}
                                {b.lable}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-3 shrink-0">
                <SummaryModel
                    cardName={cardName}
                    summary={summary}/>
            </div>
        </div>
    );
}