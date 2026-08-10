"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { TrendingDown, Lightbulb, AlertCircle } from "lucide-react";

interface PaymentData {
    month: string;
    minimumPayment: number;
    fullPayment: number;
}

export default function InterestCalculator() {
    const [balance, setBalance] = useState(25000);
    const [monthlyPayment, setMonthlyPayment] = useState(2500);
    const [interestRate, setInterestRate] = useState(36);

    const calculatePayments = (): PaymentData[] => {
        const monthlyRate = interestRate / 100 / 12;
        const data: PaymentData[] = [];

        let minBalance = balance;
        let fixedBalance = balance;

        for (let month = 1; month <= 12; month++) {
            const minPaymentAmt = Math.max(minBalance * 0.05, 500);
            minBalance = Math.max(0, minBalance * (1 + monthlyRate) - minPaymentAmt);

            fixedBalance = Math.max(0, fixedBalance * (1 + monthlyRate) - monthlyPayment);

            data.push({
                month: `M${month}`,
                minimumPayment: Math.round(minBalance),
                fullPayment: Math.round(fixedBalance),
            });
        }

        return data;
    };

    const paymentData = calculatePayments();

    const CustomLineTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/90 border border-white/20 p-3 rounded-xl shadow-xl text-white text-xs space-y-1">
                    <p className="font-bold text-zinc-400 border-b border-white/10 pb-1">Month {label?.replace("M", "")}</p>
                    {payload.map((item: any) => (
                        <div key={item.name} className="flex items-center justify-between gap-4">
                            <span className="font-medium" style={{ color: item.color }}>{item.name}:</span>
                            <span className="font-bold text-white">₹{item.value.toLocaleString("en-IN")}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 text-white">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-emerald-400" />
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Module 4</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">The Minimum Payment Trap</h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
                    Paying only the &quot;Minimum Amount Due&quot; traps you in high-interest debt cycles for years. Compare minimum payments vs fixed monthly payoffs below.
                </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-4 bg-gray-400/10 rounded-xl border border-white/20 space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 block">
                        Outstanding Balance (₹)
                    </label>
                    <Input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(Math.max(1000, Number(e.target.value)))}
                        min={1000}
                        max={500000}
                        step={1000}
                        className="bg-black/20 border-white/20 text-white font-semibold text-base"
                    />
                    <span className="text-[11px] text-zinc-400 block">Total debt on card</span>
                </div>

                <div className="p-4 bg-gray-400/10 rounded-xl border border-white/20 space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 block">
                        Fixed Monthly Payment (₹)
                    </label>
                    <Input
                        type="number"
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(Math.max(500, Number(e.target.value)))}
                        min={500}
                        max={50000}
                        step={500}
                        className="bg-black/20 border-white/20 text-white font-semibold text-base"
                    />
                    <span className="text-[11px] text-green-400/90 block">Your targeted monthly payoff</span>
                </div>

                <div className="p-4 bg-gray-400/10 rounded-xl border border-white/20 space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 block">
                        Annual Interest Rate (%)
                    </label>
                    <Input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Math.min(50, Math.max(1, Number(e.target.value))))}
                        min={12}
                        max={48}
                        step={1}
                        className="bg-black/20 border-white/20 text-white font-semibold text-base"
                    />
                    <span className="text-[11px] text-zinc-400 block">Typical card rate: 36-42%</span>
                </div>
            </div>

            {/* Line Chart */}
            <Card className="p-6 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white">12-Month Debt Balance Progression</h3>
                        <p className="text-xs text-zinc-400">Comparing Minimum 5% Payment vs ₹{monthlyPayment.toLocaleString("en-IN")}/mo Fixed Payoff</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-red-500" />
                            <span className="text-red-300">Min 5% Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-green-400" />
                            <span className="text-green-300">Fixed Payoff</span>
                        </div>
                    </div>
                </div>

                <div className="h-[340px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={paymentData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="month" stroke="#a1a1aa" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#a1a1aa" tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                            <Tooltip content={<CustomLineTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="minimumPayment"
                                stroke="#EF4444"
                                strokeWidth={3}
                                name="Minimum 5% Payment"
                                dot={{ fill: "#EF4444", r: 3 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="fullPayment"
                                stroke="#10B981"
                                strokeWidth={3}
                                name="Fixed Monthly Payoff"
                                dot={{ fill: "#10B981", r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Key Takeaways */}
            <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-5 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                    <div className="flex items-center gap-2.5 mb-2">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <h4 className="font-bold text-red-300 text-sm">Why Minimum Payments Are Dangerous</h4>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                        When you pay only the 5% minimum due, almost 80% of that payment goes towards paying interest charges, leaving the main principal debt practically untouched.
                    </p>
                </Card>

                <Card className="p-5 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                    <div className="flex items-center gap-2.5 mb-2">
                        <Lightbulb className="h-5 w-5 text-green-400" />
                        <h4 className="font-bold text-green-300 text-sm">The 100% Payoff Strategy</h4>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                        Treat your credit card like a debit card. Always clear 100% of your statement bill every month to enjoy 0 interest and earn maximum rewards stress-free.
                    </p>
                </Card>
            </div>
        </div>
    );
}