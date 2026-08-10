"use client";

import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    AlertCircle,
    Percent,
    Globe,
    Banknote,
    Fuel,
    ShieldAlert,
    CheckCircle2,
    Zap
} from "lucide-react";

interface FeeInfo {
    id: string;
    title: string;
    impact: "High" | "Medium" | "Low";
    impactColor: string;
    icon: React.ReactNode;
    description: string;
    example: string;
    howToAvoid: string;
}

const fees: FeeInfo[] = [
    {
        id: "late-fee",
        title: "Late Payment Charges + GST",
        impact: "High",
        impactColor: "text-red-400 border-red-500/30",
        icon: <AlertCircle className="h-5 w-5 text-red-400" />,
        description: "Charged when you fail to pay at least the Minimum Amount Due by the statement due date.",
        example: "₹500 to ₹1,300 depending on overdue balance + 18% GST + standard 3.5% monthly interest compounding.",
        howToAvoid: "Enable Auto-Debit for the 'Total Amount Due' from your savings account or set calendar reminders 3 days prior.",
    },
    {
        id: "cash-advance",
        title: "Cash Advance Fee (ATM Withdrawal)",
        impact: "High",
        impactColor: "text-red-400 border-red-500/30",
        icon: <Banknote className="h-5 w-5 text-red-400" />,
        description: "Withdrawing physical cash from an ATM using your credit card.",
        example: "2.5% to 3% of the withdrawn amount (Min ₹500 fee) + upfront interest starting from Day 1 (NO 45-day grace period).",
        howToAvoid: "NEVER use a credit card at an ATM. Use a regular debit card or UPI for cash requirements.",
    },
    {
        id: "forex-markup",
        title: "Foreign Exchange (Forex) Markup Fee",
        impact: "Medium",
        impactColor: "text-yellow-400 border-yellow-500/30",
        icon: <Globe className="h-5 w-5 text-yellow-400" />,
        description: "Fee added on top of currency conversion rate when purchasing in USD, EUR, or non-INR currencies online or abroad.",
        example: "Standard cards charge 3.5% + 18% GST (Total ~4.13% extra on international spends).",
        howToAvoid: "Use specialized Zero Forex Cards (e.g. Scapia, Niyo Global, IDFC WOW, or IXIGO AU Card).",
    },
    {
        id: "overlimit-fee",
        title: "Overlimit Fee",
        impact: "Medium",
        impactColor: "text-yellow-400 border-yellow-500/30",
        icon: <Zap className="h-5 w-5 text-yellow-400" />,
        description: "Triggered if your transactions exceed your approved credit limit.",
        example: "2.5% of the overlimit amount (Min ₹500 per instance).",
        howToAvoid: "Disable 'Overlimit Transactions' feature in your bank mobile banking app settings.",
    },
    {
        id: "emi-fee",
        title: "Merchant EMI Processing Fee",
        impact: "Low",
        impactColor: "text-blue-400 border-blue-500/30",
        icon: <Percent className="h-5 w-5 text-blue-400" />,
        description: "One-time processing fee charged by banks when converting a purchase into monthly installments.",
        example: "₹199 to ₹299 + 18% GST levied on EMI setup.",
        howToAvoid: "Look for 'No Cost EMI' offers that explicitly waive processing fees, or pay upfront.",
    },
    {
        id: "fuel-surcharge",
        title: "Fuel Surcharge Fee",
        impact: "Low",
        impactColor: "text-blue-400 border-blue-500/30",
        icon: <Fuel className="h-5 w-5 text-blue-400" />,
        description: "Surcharge added at petrol pumps when paying via credit card.",
        example: "1% of fuel total (Min ₹10 fee per fuel fill).",
        howToAvoid: "Most credit cards offer a '1% Fuel Surcharge Waiver' for transactions between ₹400 and ₹4,000.",
    },
];

export default function HiddenFees() {
    return (
        <div className="space-y-8 text-white">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="h-5 w-5 text-red-400" />
                    <span className="text-xs uppercase tracking-wider text-red-400 font-semibold">Module 5</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Hidden Fees & Fine Print</h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
                    Credit card fine print contains hidden charges that sneak up on your bill. Here is how to avoid every single one.
                </p>
            </div>

            {/* Accordion Fees */}
            <Accordion type="single" collapsible className="w-full space-y-3">
                {fees.map((fee) => (
                    <AccordionItem key={fee.id} value={fee.id} className="border border-white/20 rounded-xl overflow-hidden bg-gray-400/10 px-2">
                        <AccordionTrigger className="hover:no-underline py-4 px-4 text-left font-semibold text-white">
                            <div className="flex items-center gap-3 flex-1 pr-2">
                                <div className="p-2 rounded-lg bg-white/10 border border-white/10 shrink-0">
                                    {fee.icon}
                                </div>
                                <span className="text-sm sm:text-base font-semibold text-white flex-1">{fee.title}</span>
                                <span className={`text-[11px] px-2.5 py-0.5 border rounded-md font-semibold bg-white/10 ${fee.impactColor} shrink-0`}>
                                    {fee.impact} Impact
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-5 pt-1 text-zinc-300">
                            <div className="space-y-4 pt-2 border-t border-white/10">
                                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{fee.description}</p>
                                
                                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                                    <span className="text-xs font-semibold text-red-400 block">Typical Cost Example:</span>
                                    <p className="text-xs text-zinc-200">{fee.example}</p>
                                </div>

                                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                                    <span className="text-xs font-semibold text-green-400 flex items-center gap-1.5">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        How to Avoid 100%:
                                    </span>
                                    <p className="text-xs text-zinc-200">{fee.howToAvoid}</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* Pro Tip Summary */}
            <Card className="p-6 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    The 3-Step Protection Checklist
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 text-xs text-zinc-300">
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <span className="font-bold text-blue-400 block text-sm">1. Turn On Auto-Debit</span>
                        <p className="text-zinc-400">Never miss a payment due date. Set auto-pay for full statement balance.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <span className="font-bold text-yellow-400 block text-sm">2. Check MITC PDF</span>
                        <p className="text-zinc-400">Read the Most Important Terms & Conditions (MITC) before activating any new card.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <span className="font-bold text-green-400 block text-sm">3. Disable ATM Cash</span>
                        <p className="text-zinc-400">Turn off domestic & international ATM cash withdrawal controls in your bank app.</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}