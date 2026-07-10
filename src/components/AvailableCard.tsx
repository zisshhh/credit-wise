import data from "@/data/cards.json"
import { CardDiv } from "./CardDiv"
import { Fuel, Plane, Shield, UtensilsCrossed } from "lucide-react";

export const AvailableCard = () => {
    const cards = data[0];

    return (
        <section className="w-full py-12">
            <div className="mx-auto max-w7xl px-4">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white">
                        Available Credit Cards
                    </h2>
                    <p className="mt-2 text-zinc-400">
                        Compare features, rewards and benefits to find the perfect credit
                        card.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cards.map((card) => (
                            <CardDiv
                                key={card.id}
                                image={card.image}
                                cardName={card.name}
                                bankName={card.bank}
                                annualFee={card.annual_fee}
                                minIncome={card.eligibility}
                                isPremuim={card.is_premium}
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