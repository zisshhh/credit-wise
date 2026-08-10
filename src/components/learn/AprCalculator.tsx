"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Calculator, AlertTriangle, Zap } from "lucide-react";

const COLORS = ["#3B82F6", "#F97316"];

export default function AprCalculator() {
    const [loanAmount, setLoanAmount] = useState(25000);
    const [apr, setApr] = useState(24);
    const [duration, setDuration] = useState(6);

    const calculateInterest = () => {
        const monthlyRate = apr / 100 / 12;
        const interest = loanAmount * monthlyRate * duration;
        return Math.round(interest);
    };

    const interest = calculateInterest();
    const totalRepayment = loanAmount + interest;
    const monthlyEmi = Math.round(totalRepayment / duration);

    const pieData = [
        { name: "Principal Borrowed", value: loanAmount },
        { name: "Total Interest Cost", value: interest },
    ];

    const CustomPieTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-black/90 border border-white/20 p-2.5 rounded-lg shadow-xl text-white text-xs">
                    <p className="font-semibold" style={{ color: data.color }}>{data.name}</p>
                    <p className="text-sm font-bold text-white mt-0.5">₹{data.value.toLocaleString("en-IN")}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 text-white">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-sky-400" />
                    <span className="text-xs uppercase tracking-wider text-sky-400 font-semibold">Module 3</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Understanding APR (Annual Percentage Rate)</h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
                    APR measures the annualized cost of carrying a balance on your credit card. Test how different loan balances & APRs impact total interest.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-12 items-start">
                {/* Sliders Area */}
                <div className="md:col-span-7 space-y-6 bg-gray-400/10 p-6 rounded-2xl border border-white/20">
                    <div>
                        <div className="flex justify-between items-center mb-2 text-sm font-medium">
                            <span className="text-zinc-300">Carried Balance Amount</span>
                            <span className="text-blue-400 font-bold text-base">₹{loanAmount.toLocaleString("en-IN")}</span>
                        </div>
                        <Slider
                            value={[loanAmount]}
                            onValueChange={([val]) => setLoanAmount(val)}
                            min={2000}
                            max={100000}
                            step={1000}
                            className="w-full py-2"
                        />
                        <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                            <span>₹2,000</span>
                            <span>₹100,000</span>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 text-sm font-medium">
                            <span className="text-zinc-300">Annual Percentage Rate (APR)</span>
                            <span className="text-orange-400 font-bold text-base">{apr}% per year</span>
                        </div>
                        <Slider
                            value={[apr]}
                            onValueChange={([val]) => setApr(val)}
                            min={12}
                            max={42}
                            step={1}
                            className="w-full py-2"
                        />
                        <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                            <span>12% (Lowest)</span>
                            <span>42% (Standard Credit Card)</span>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 text-sm font-medium">
                            <span className="text-zinc-300">Repayment Duration</span>
                            <span className="text-purple-400 font-bold text-base">{duration} Months</span>
                        </div>
                        <Slider
                            value={[duration]}
                            onValueChange={([val]) => setDuration(val)}
                            min={1}
                            max={24}
                            step={1}
                            className="w-full py-2"
                        />
                        <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                            <span>1 Month</span>
                            <span>24 Months</span>
                        </div>
                    </div>
                </div>

                {/* Summary Card */}
                <div className="md:col-span-5 space-y-4">
                    <Card className="p-6 bg-gray-400/10 border border-white/20 rounded-2xl text-white shadow-2xl">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
                            <span>Repayment Summary</span>
                            <span className="bg-white/10 border border-white/20 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold">
                                {duration} Month EMI
                            </span>
                        </h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Principal Balance:</span>
                                <span className="font-semibold text-zinc-200">₹{loanAmount.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Total Interest Payable:</span>
                                <span className="font-semibold text-orange-400">+ ₹{interest.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                                <span className="text-sm font-medium text-zinc-300">Total Amount Paid:</span>
                                <span className="text-xl font-extrabold text-white">₹{totalRepayment.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex justify-between items-center text-xs">
                                <span className="text-blue-300 font-medium">Est. Monthly EMI:</span>
                                <span className="text-sm font-bold text-blue-400">₹{monthlyEmi.toLocaleString("en-IN")}/mo</span>
                            </div>
                        </div>
                    </Card>

                    {/* Chart Container */}
                    <Card className="p-4 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                        <div className="h-[180px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={65}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomPieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center items-center gap-6 text-xs mt-2">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-blue-500" />
                                <span className="text-zinc-300">Principal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-orange-500" />
                                <span className="text-zinc-300">Interest ({Math.round((interest/totalRepayment)*100)}%)</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Note */}
            <Card className="p-5 bg-gray-400/10 border border-white/20 rounded-2xl text-white">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-zinc-300 space-y-1">
                        <span className="font-semibold text-amber-300 block">Pro Tip on Credit Card APR</span>
                        <p className="leading-relaxed">
                            Credit card interest is charged daily using your Average Daily Balance. If you clear 100% of your bill before the due date, you enjoy up to 45 to 50 days of <strong>0% interest grace period</strong>!
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}