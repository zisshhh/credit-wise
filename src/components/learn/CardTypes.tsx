"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
    CreditCard,
    Gift,
    Plane,
    Sparkles,
    CheckCircle2,
    Zap,
    ShieldCheck
} from "lucide-react";

interface CardType {
    title: string;
    icon: React.ReactNode;
    badge: string;
    description: string;
    example: string;
    bestFor: string;
    benefits: string[];
}

const cardTypes: CardType[] = [
    {
        title: "Cashback Cards",
        icon: <CreditCard className="h-6 w-6 text-green-400" />,
        badge: "Most Popular",
        description: "Earn direct money back as statement credit on your everyday shopping and utilities.",
        example: "HDFC Millennia (5% on Amazon/Flipkart) • SBI Cashcard (5% online)",
        bestFor: "Everyday shoppers, online buyers, and beginners seeking simple value.",
        benefits: [
            "Direct cash credit to account",
            "No complex point conversions or expiry dates",
            "Highest returns on recurring monthly spends",
        ],
    },
    {
        title: "Rewards Cards",
        icon: <Gift className="h-6 w-6 text-purple-400" />,
        badge: "High Value",
        description: "Accumulate reward points that can be redeemed for gift vouchers, electronics, or flights.",
        example: "Amex MRCC • HDFC MoneyBack+ • Axis Bank SELECT",
        bestFor: "Flexible spenders who want gift cards, shopping vouchers, or catalog rewards.",
        benefits: [
            "Accelerated points on bonus milestone categories",
            "Flexible redemption catalog with multiple partners",
            "Exclusive welcome bonuses & quarterly milestone perks",
        ],
    },
    {
        title: "Travel & Lifestyle Cards",
        icon: <Plane className="h-6 w-6 text-sky-400" />,
        badge: "Premium Perks",
        description: "Tailored for travelers offering free airport lounge visits, low forex markup, and hotel perks.",
        example: "HDFC Regalia Gold • Axis Atlas • SBI Club Vistara",
        bestFor: "Frequent flyers, international vacationers, and business travelers.",
        benefits: [
            "Free domestic & international airport lounge access",
            "Low or zero foreign currency transaction fees (Forex)",
            "Comprehensive travel insurance & flight transfer miles",
        ],
    },
    {
        title: "Lifetime Free Cards",
        icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
        badge: "Zero Annual Fee",
        description: "Zero annual or joining fees forever. Great for building credit score without fixed costs.",
        example: "Amazon Pay ICICI • OneCard • IDFC FIRST Millennia",
        bestFor: "First-time cardholders, students, and budget-conscious users.",
        benefits: [
            "₹0 maintenance fee forever with no minimum spend conditions",
            "Build your CIBIL score safely without yearly cost pressure",
            "Unlocks instant discounts during major online festive sales",
        ],
    },
];

export default function CardTypes() {
    return (
        <div className="space-y-8 text-white">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Module 1</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Types of Credit Cards</h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
                    Every credit card is engineered for specific spending habits. Choose the right category to maximize your returns.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {cardTypes.map((type, index) => (
                    <motion.div
                        key={type.title}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }} >
                        <Card className="p-6 bg-gray-400/10 border border-white/20 text-white rounded-2xl h-full flex flex-col justify-between hover:bg-gray-400/15 transition-all duration-300">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                                            {type.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{type.title}</h3>
                                    </div>
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-white">
                                        {type.badge}
                                    </span>
                                </div>

                                <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{type.description}</p>

                                <div className="mb-4 p-3 rounded-xl bg-black/40 border border-white/10">
                                    <span className="text-xs text-zinc-400 font-medium block mb-1">Popular Examples:</span>
                                    <p className="text-xs text-zinc-200 font-medium">{type.example}</p>
                                </div>

                                <div>
                                    <span className="text-xs text-zinc-400 font-medium block mb-2">Key Advantages:</span>
                                    <ul className="space-y-2">
                                        {type.benefits.map((benefit, idx) => (
                                            <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                                <span className="text-zinc-400">Best for:</span>
                                <span className="text-blue-300 font-medium text-right max-w-[200px]">{type.bestFor}</span>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card className="p-6 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/10 text-blue-400 border border-white/10 shrink-0">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">Smart Decision Checklist</h3>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm text-zinc-300 pt-1">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                <span>Align card rewards with your top 2 expense categories</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                <span>Verify if annual fee is waived on hitting spend milestones</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                <span>Check welcome bonus voucher terms before applying</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                <span>Start with a Lifetime Free card if you are building credit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}