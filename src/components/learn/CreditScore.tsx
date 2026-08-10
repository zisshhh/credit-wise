"use client";

import { Card } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { CheckCircle2, XCircle, Shield, Award, HelpCircle } from "lucide-react";

interface ScoreFactor {
    name: string;
    percentage: number;
    description: string;
    color: string;
}

const scoreFactors: ScoreFactor[] = [
    {
        name: "Payment History",
        percentage: 35,
        description: "Your consistency in paying bills on time. A single 30-day late payment can drop scores by 50+ points.",
        color: "#3B82F6",
    },
    {
        name: "Credit Utilization",
        percentage: 30,
        description: "The percentage of your total limit used across all cards. Keep this below 30% for ideal scores.",
        color: "#10B981",
    },
    {
        name: "Credit History Length",
        percentage: 15,
        description: "Average age of your open credit accounts. Older active cards significantly boost stability.",
        color: "#8B5CF6",
    },
    {
        name: "Credit Mix",
        percentage: 10,
        description: "Healthy balance of revolving credit (cards) and installment loans (personal/car loans).",
        color: "#F59E0B",
    },
    {
        name: "New Credit & Inquiries",
        percentage: 10,
        description: "Hard inquiries from applying for multiple cards in a short window temporarily dip scores.",
        color: "#EC4899",
    },
];

const scoreRanges = [
    { range: "750 - 900", label: "Excellent", status: "Instant approvals & lowest interest", color: "text-green-400 border-green-500/30" },
    { range: "700 - 749", label: "Good", status: "High approval rates for premium cards", color: "text-blue-400 border-blue-500/30" },
    { range: "650 - 699", label: "Fair", status: "Standard card options, moderate limits", color: "text-yellow-400 border-yellow-500/30" },
    { range: "300 - 649", label: "Needs Work", status: "Secured credit cards required to build", color: "text-red-400 border-red-500/30" },
];

const dos = [
    "Always pay 100% of the total statement balance before the due date",
    "Keep credit utilization under 30% (e.g. spend < ₹30k on ₹1L limit)",
    "Keep your oldest credit card active even if you rarely use it",
    "Monitor your CIBIL report quarterly for fraudulent entries",
];

const donts = [
    "Never pay only the 'Minimum Amount Due' regularly — interest compounds fast",
    "Don't apply for 3+ credit cards simultaneously within a single month",
    "Avoid maxing out card limits right before statement generation date",
    "Don't close your oldest card account without evaluating history length impact",
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-black/90 border border-white/20 p-3 rounded-xl shadow-xl text-white text-xs space-y-1">
                <p className="font-bold text-sm text-blue-400">{data.name}</p>
                <p className="font-semibold text-zinc-200">Weight: {data.percentage}% of overall score</p>
                <p className="text-zinc-400 max-w-[220px] leading-relaxed">{data.description}</p>
            </div>
        );
    }
    return null;
};

export default function CreditScoreFactors() {
    return (
        <div className="space-y-8 text-white">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-indigo-400" />
                    <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">Module 2</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Understanding CIBIL & Credit Scores</h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
                    Your credit score (300 to 900) determines your creditworthiness. Here is exact math behind how bureaus calculate it.
                </p>
            </div>

            {/* Score Ranges Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {scoreRanges.map((range, index) => (
                    <div key={index} className={`p-4 rounded-xl bg-gray-400/10 border ${range.color} flex flex-col justify-between`}>
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider block opacity-80">{range.label}</span>
                            <span className="text-2xl font-extrabold block my-1">{range.range}</span>
                        </div>
                        <span className="text-xs opacity-90 leading-tight">{range.status}</span>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <Card className="p-6 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Award className="h-5 w-5 text-yellow-400" />
                            Score Weightage Breakdown
                        </h3>
                        <p className="text-xs text-zinc-400">Hover over any bar to see impact details</p>
                    </div>
                    <span className="border border-white/20 bg-white/10 px-2.5 py-1 rounded-md text-xs text-white">
                        5 Key Pillars
                    </span>
                </div>

                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={scoreFactors}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                            <XAxis type="number" domain={[0, 40]} tick={{ fill: "#a1a1aa", fontSize: 12 }} unit="%" />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={130}
                                tick={{ fill: "#e4e4e7", fontSize: 12, fontWeight: 500 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="percentage" radius={[0, 8, 8, 0]}>
                                {scoreFactors.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Dos and Don'ts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        <h3 className="text-lg font-bold text-green-300">Golden Rules (Do&apos;s)</h3>
                    </div>
                    <ul className="space-y-3">
                        {dos.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                                <span className="h-2 w-2 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card className="p-6 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <XCircle className="h-5 w-5 text-red-400" />
                        <h3 className="text-lg font-bold text-red-300">Score Killers (Don&apos;ts)</h3>
                    </div>
                    <ul className="space-y-3">
                        {donts.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                                <span className="h-2 w-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* Pro Tip Card */}
            <Card className="p-5 bg-gray-400/10 border border-white/20 rounded-2xl">
                <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-zinc-300 space-y-1">
                        <span className="font-semibold text-white block">Did You Know?</span>
                        <p>
                            Checking your own credit score through official apps is considered a 
                            <strong className="text-indigo-300 font-medium"> Soft Inquiry</strong> and has <strong className="text-green-400 font-medium">0% negative impact</strong> on your credit score!
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}