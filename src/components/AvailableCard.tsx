import data from "@/data/cards.json"
import { CardDiv } from "./CardDiv"
import { Fuel, Plane, Shield, UtensilsCrossed } from "lucide-react";

interface AvailableCardProps {
    limit?: number
}

export const AvailableCard = ({limit}: AvailableCardProps) => {
    const cards = data[0];

    const displayedCards = limit ? cards.slice(0, limit) : cards;

    return (
        <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white">
                        Available Credit Cards
                    </h2>
                    <p className="mt-2 text-zinc-400">
                        Compare features, rewards and benefits to find the perfect credit
                        card.
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
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
            </div>
        </section>
    )
}