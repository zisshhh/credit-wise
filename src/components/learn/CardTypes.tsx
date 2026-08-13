"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
    CreditCard,
    Gift,
    Plane,
    Sparkles,
    CheckCircle2,
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
        icon: <CreditCard className="h-6 w-6" />,
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
        icon: <Gift className="h-6 w-6" />,
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
        icon: <Plane className="h-6 w-6" />,
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
        icon: <Sparkles className="h-6 w-6" />,
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
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Types of Credit Cards</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-4xl">
                    Different credit cards serve different purposes. Choose the one that best matches your spending habits and financial goals.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {cardTypes.map((type, index) => (
                    <motion.div
                        key={type.title}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }} >
                        <Card className="p-6 bg-gray-400/10 border border-white/20 text-white rounded-2xl h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="">
                                        {type.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{type.title}</h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-white">
                                    {type.badge}
                                </span>
                            </div>

                            <p className="text-muted-foreground">{type.description}</p>

                            <div className="mb-2">
                                <h4 className="font-medium mb-1">Example:</h4>
                                <p className="text-sm">{type.example}</p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Key Advantages:</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    {type.benefits.map((benefit, idx) => (
                                        <li key={idx} className="text-sm">
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card className="p-4 bg-gray-400/10 border-none text-white">
                <h3 className="text-lg font-medium mb-2">Choosing the Right Card</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li>Consider your spending patterns and lifestyle</li>
                    <li>Compare rewards and benefits across different cards</li>
                    <li>Check if the annual fee is worth the benefits</li>
                    <li>Look for cards that offer welcome bonuses</li>
                </ul>
            </Card>
        </div>
    );
}