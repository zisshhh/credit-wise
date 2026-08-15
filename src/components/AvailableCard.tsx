"use client";

import { useState } from "react";
import data from "@/data/cards.json";
import { CardDiv } from "./CardDiv";
import { ChevronDown, Fuel, Plane, Shield, UtensilsCrossed } from "lucide-react";
import { Button } from "./ui/button";

interface AvailableCardProps {
    limit?: number;
}

export const AvailableCard = ({ limit }: AvailableCardProps) => {
    const cards = data[0];
    const initialLimit = limit ?? 8;
    const [visibleCount, setVisibleCount] = useState<number>(initialLimit);

    const displayedCards = cards.slice(0, visibleCount);
    const hasMore = visibleCount < cards.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 4, cards.length));
    };

    return (
        <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Available Credit Cards
                        </h2>
                        <p className="mt-2 text-zinc-400">
                            Compare features, rewards and benefits to find the perfect credit
                            card.
                        </p>
                    </div>
                    <div className="text-sm text-zinc-400 font-medium">
                        Showing {displayedCards.length} of {cards.length} cards
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {displayedCards.map((card) => (
                        <CardDiv
                            key={card.id}
                            image={card.image}
                            cardName={card.name}
                            bankName={card.bank}
                            annualFee={card.annual_fee}
                            minIncome={card.eligibility}
                            isPremium={card.is_premium}
                            rating={card.rating}
                            benefits={[
                                {
                                    icon: <Plane className="w-4 h-4" />,
                                    lable: card.lounge_access,
                                },
                                {
                                    icon: <Fuel className="w-4 h-4" />,
                                    lable: card.fuel_benefits
                                },
                                {
                                    icon: <UtensilsCrossed className="w-4 h-4" />,
                                    lable: card.dining
                                },
                                {
                                    icon: <Shield className="w-4 h-4" />,
                                    lable: card.insurance
                                }
                            ]}
                            rewards={card.reward_rate}
                            summary={card.summary}
                        />
                    ))}
                </div>

                {hasMore && (
                    <div className="mt-12 flex justify-center">
                        <Button
                            onClick={handleLoadMore}
                            className="px-6 py-2 text-sm bg-gray-400/10 hover:bg-gray-400/15 border border-white/20 text-white rounded-md transition-colors cursor-pointer">
                            Load More
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};