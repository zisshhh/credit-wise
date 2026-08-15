"use client";

import { motion } from "framer-motion";
import { Navbaar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AprCalculator from "@/components/learn/AprCalculator";
import InterestCalculator from "@/components/learn/InterestCalculator";
import HiddenFees from "@/components/learn/HiddenFees";
import CardTypes from "@/components/learn/CardTypes";
import CreditScoreFactors from "@/components/learn/CreditScore";
import AskBuddy from "@/components/learn/AskBuddy";

export default function LearnPage() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col justify-between relative">
            <Navbaar />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20 py-10 w-full flex-1 space-y-8">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">
                            Learn Credit Cards
                        </h1>
                        <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl">
                            Master the basics of credit cards, interest rates, and smart usage.
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="types" className="w-full">
                    <div className="w-full overflow-x-auto pb-2 scrollbar-none mb-6">
                        <TabsList className="grid grid-cols-5 max-sm:flex max-sm:w-max w-full bg-gray-400/10 border border-white/10 p-1.5 rounded-xl gap-1 h-auto">
                            <TabsTrigger 
                                value="types" 
                                className="py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg text-zinc-400 data-[state=active]:bg-white/20 data-[state=active]:text-white shadow-none">
                                Card Types
                            </TabsTrigger>
                            <TabsTrigger 
                                value="score" 
                                className="py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg text-zinc-400 data-[state=active]:bg-white/20 data-[state=active]:text-white transition-all shadow-none">
                                Credit Score
                            </TabsTrigger>
                            <TabsTrigger 
                                value="apr" 
                                className="py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg text-zinc-400 data-[state=active]:bg-white/20 data-[state=active]:text-white transition-all shadow-none">
                                APR Basics
                            </TabsTrigger>
                            <TabsTrigger 
                                value="interest" 
                                className="py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg text-zinc-400 data-[state=active]:bg-white/20 data-[state=active]:text-white transition-all shadow-none">
                                Interest Math
                            </TabsTrigger>
                            <TabsTrigger 
                                value="fees" 
                                className="py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg text-zinc-400 data-[state=active]:bg-white/20 data-[state=active]:text-white transition-all shadow-none">
                                Hidden Fees
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="types" className="focus-visible:outline-none">
                        <Card className="p-6 sm:p-8 bg-black border border-white/20 text-white rounded-2xl">
                            <CardTypes />
                        </Card>
                    </TabsContent>

                    <TabsContent value="score" className="focus-visible:outline-none">
                        <Card className="p-6 sm:p-8 bg-black border border-white/20 text-white rounded-2xl">
                            <CreditScoreFactors />
                        </Card>
                    </TabsContent>

                    <TabsContent value="apr" className="focus-visible:outline-none">
                        <Card className="p-6 sm:p-8 bg-black border border-white/20 text-white rounded-2xl">
                            <AprCalculator />
                        </Card>
                    </TabsContent>

                    <TabsContent value="interest" className="focus-visible:outline-none">
                        <Card className="p-6 sm:p-8 bg-black border border-white/20 text-white rounded-2xl">
                            <InterestCalculator />
                        </Card>
                    </TabsContent>

                    <TabsContent value="fees" className="focus-visible:outline-none">
                        <Card className="p-6 sm:p-8 bg-black border border-white/20 text-white rounded-2xl">
                            <HiddenFees />
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="pt-4">
                    <AskBuddy />
                </div>
            </div>

            <Footer />
        </main>
    );
}