"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import data from "@/data/cards.json";
import { CardDiv } from "./CardDiv";
import { Button } from "./ui/button";
import {
    Search, X, SlidersHorizontal, CreditCard, Plane, Fuel, UtensilsCrossed,
    Shield, Gift, Sparkles, Crown, Percent, Star, RotateCcw, Building2,
    Banknote, ArrowUpDown, ArrowRight, SearchX,
} from "lucide-react";
import {
    CardTypeCategory, CARD_TYPE_OPTIONS, BANK_OPTIONS, FEE_RANGE_OPTIONS,
    SORT_OPTIONS, FeeRange, SortOption, PerkFilters, filterAndSortCards,
    getCardPrimaryCategory,
} from "@/lib/card-filters";
import { CardDataProps } from "@/types";

interface AvailableCardProps {
    limit?: number;
    showSearchAndFilters?: boolean;
}

const emptyPerks: PerkFilters = {
    lounge: false,
    fuel: false,
    dining: false,
    insurance: false,
    highRating: false,
};

const typeIcons: Record<CardTypeCategory, React.ReactNode> = {
    all: <CreditCard className="w-4 h-4" />,
    cashback: <Percent className="w-4 h-4" />,
    travel: <Plane className="w-4 h-4" />,
    rewards: <Gift className="w-4 h-4" />,
    free: <Sparkles className="w-4 h-4" />,
    premium: <Crown className="w-4 h-4" />,
    dining: <UtensilsCrossed className="w-4 h-4" />,
    fuel: <Fuel className="w-4 h-4" />,
};

const perkOptions = [
    { key: "lounge", label: "Lounge", icon: <Plane className="w-3 h-3" />, title: "Free airport lounge access" },
    { key: "fuel", label: "Fuel", icon: <Fuel className="w-3 h-3" />, title: "Fuel surcharge waiver & fuel points" },
    { key: "dining", label: "Dining", icon: <UtensilsCrossed className="w-3 h-3" />, title: "Dining offers & restaurant discounts" },
    { key: "highRating", label: "4.5+ ★", icon: <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />, title: "Rated 4.5 or higher" },
] as const;

export const AvailableCard = ({
    limit,
    showSearchAndFilters = !limit,
}: AvailableCardProps) => {
    const rawCards = (data[0] || []) as CardDataProps[];
    const initialBatch = limit ?? 12;

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<CardTypeCategory>("all");
    const [selectedBank, setSelectedBank] = useState("All Banks");
    const [selectedFeeRange, setSelectedFeeRange] = useState<FeeRange>("all");
    const [selectedSort, setSelectedSort] = useState<SortOption>("featured");
    const [perks, setPerks] = useState<PerkFilters>({ ...emptyPerks });
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(initialBatch);

    const filteredCards = useMemo(
        () =>
            showSearchAndFilters
                ? filterAndSortCards(rawCards, {
                      query: searchQuery,
                      type: selectedType,
                      bank: selectedBank,
                      feeRange: selectedFeeRange,
                      perks,
                      sortBy: selectedSort,
                  })
                : rawCards,
        [rawCards, showSearchAndFilters, searchQuery, selectedType, selectedBank, selectedFeeRange, perks, selectedSort]
    );

    const displayedCards = filteredCards.slice(0, visibleCount);
    const hasMore = visibleCount < filteredCards.length;

    const resetVisibleCount = () => setVisibleCount(initialBatch);
    const updateFilter = (update: () => void) => {
        update();
        resetVisibleCount();
    };

    const resetAll = () => {
        setSearchQuery("");
        setSelectedType("all");
        setSelectedBank("All Banks");
        setSelectedFeeRange("all");
        setSelectedSort("featured");
        setPerks({ ...emptyPerks });
        resetVisibleCount();
    };

    const togglePerk = (key: keyof PerkFilters) =>
        updateFilter(() => setPerks((prev) => ({ ...prev, [key]: !prev[key] })));

    const activeFiltersCount =
        Number(!!searchQuery.trim()) +
        Number(selectedType !== "all") +
        Number(selectedBank !== "All Banks") +
        Number(selectedFeeRange !== "all") +
        Number(selectedSort !== "featured") +
        Object.values(perks).filter(Boolean).length;

    const quickSuggestions = [
        { label: "5% Cashback", apply: () => { setSearchQuery("cashback"); setSelectedType("cashback"); } },
        { label: "Airport Lounge", apply: () => { setSelectedType("travel"); setPerks((p) => ({ ...p, lounge: true })); } },
        { label: "Lifetime Free (₹0)", apply: () => { setSelectedType("free"); setSelectedFeeRange("free"); } },
        { label: "HDFC Bank", apply: () => setSelectedBank("HDFC") },
        { label: "American Express", apply: () => setSelectedBank("American Express") },
        { label: "Under ₹1,000", apply: () => setSelectedFeeRange("under-1k") },
        { label: "Premium Luxury", apply: () => setSelectedType("premium") },
    ];

    const activeTags = [
        searchQuery && { label: `Query: "${searchQuery}"`, remove: () => setSearchQuery("") },
        selectedType !== "all" && {
            label: `Type: ${CARD_TYPE_OPTIONS.find((item) => item.id === selectedType)?.label}`,
            remove: () => setSelectedType("all"),
        },
        selectedBank !== "All Banks" && { label: `Bank: ${selectedBank}`, remove: () => setSelectedBank("All Banks") },
        selectedFeeRange !== "all" && {
            label: `Fee: ${FEE_RANGE_OPTIONS.find((item) => item.id === selectedFeeRange)?.label}`,
            remove: () => setSelectedFeeRange("all"),
        },
        perks.lounge && { label: "✈️ Lounge Access", remove: () => togglePerk("lounge") },
        perks.fuel && { label: "⛽ Fuel Waiver", remove: () => togglePerk("fuel") },
        perks.dining && { label: "🍽️ Dining Perks", remove: () => togglePerk("dining") },
        perks.highRating && { label: "⭐ 4.5+ Rating", remove: () => togglePerk("highRating") },
    ].filter(Boolean) as { label: string; remove: () => void }[];

    return (
        <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Available Credit Cards
                        </h2>
                        <p className="mt-2 text-zinc-400 max-w-2xl text-sm sm:text-base">
                            {showSearchAndFilters
                                ? "Search and compare cards across cashback, airport lounge travel, zero fee, rewards, and luxury tiers to find your ideal match."
                                : "Compare features, rewards and benefits to find the perfect credit card."}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium bg-white/5 border border-white/10 px-4 py-2 rounded-xl self-start md:self-auto">
                        Showing <span className="text-white font-semibold">{displayedCards.length}</span> of{" "}
                        <span className="font-semibold">{filteredCards.length}</span>{" "}
                        {filteredCards.length === 1 ? "card" : "cards"}
                        {showSearchAndFilters && rawCards.length !== filteredCards.length && (
                            <span className="text-zinc-500 text-xs">({rawCards.length} total)</span>
                        )}
                    </div>
                </div>

                {showSearchAndFilters && (
                    <>
                        <div className="mb-6 space-y-3">
                            <div className="relative flex items-center">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                                <input
                                    value={searchQuery}
                                    onChange={(e) => updateFilter(() => setSearchQuery(e.target.value))}
                                    placeholder="Search by card name, bank, rewards, lounge, cashback..."
                                    className="w-full pl-12 pr-28 py-3.5 bg-zinc-900/90 hover:bg-zinc-900 focus:bg-zinc-950 border border-white/20 focus:border-zinc-500 rounded-2xl text-white placeholder:text-zinc-500 outline-none transition-all duration-200 text-sm sm:text-base shadow-inner"/>
                                <div className="absolute right-3 flex items-center gap-1.5">
                                    {searchQuery && (
                                        <button onClick={() => updateFilter(() => setSearchQuery(""))} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" title="Clear search">
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setShowAdvancedFilters((prev) => !prev)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                                            showAdvancedFilters || activeFiltersCount > 0
                                                ? "bg-zinc-800 text-white border-zinc-600"
                                                : "bg-white/10 text-zinc-300 border-white/15 hover:bg-white/15"
                                        }`}
                                        title="Toggle additional filters">
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Filters</span>
                                        {activeFiltersCount > 0 && (
                                            <span className="size-4.5 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
                                                {activeFiltersCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-zinc-400">
                                <span className="shrink-0 text-zinc-500 font-medium">Quick searches:</span>
                                {quickSuggestions.map((item) => (
                                    <button key={item.label} onClick={() => updateFilter(item.apply)} className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white transition-all cursor-pointer whitespace-nowrap text-xs">
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
                                Filter by Card Type
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                                {CARD_TYPE_OPTIONS.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => updateFilter(() => setSelectedType(type.id))}
                                        title={type.description}
                                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 shrink-0 cursor-pointer ${
                                            selectedType === type.id
                                                ? "bg-white/10 text-white border-white/20 shadow-sm font-semibold"
                                                : "bg-[#111111] text-gray-400 border-[#252525] hover:bg-[#1A1A1A]"
                                        }`}>
                                        <span className="text-zinc-400">{typeIcons[type.id]}</span>
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 mb-6 transition-all duration-300 ${showAdvancedFilters ? "block" : "hidden sm:grid"}`}>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                                    <Building2 className="w-3.5 h-3.5" /> Issuing Bank
                                </label>
                                <select value={selectedBank} onChange={(e) => updateFilter(() => setSelectedBank(e.target.value))} className="w-full bg-zinc-950 border border-white/15 focus:border-zinc-500 text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors">
                                    {BANK_OPTIONS.map((bank) => <option key={bank} value={bank}>{bank}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                                    <Banknote className="w-3.5 h-3.5" /> Annual Fee
                                </label>
                                <select value={selectedFeeRange} onChange={(e) => updateFilter(() => setSelectedFeeRange(e.target.value as FeeRange))} className="w-full bg-zinc-950 border border-white/15 focus:border-zinc-500 text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors">
                                    {FEE_RANGE_OPTIONS.map((fee) => <option key={fee.id} value={fee.id}>{fee.label}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                                    <ArrowUpDown className="w-3.5 h-3.5" /> Sort By
                                </label>
                                <select value={selectedSort} onChange={(e) => updateFilter(() => setSelectedSort(e.target.value as SortOption))} className="w-full bg-zinc-950 border border-white/15 focus:border-zinc-500 text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors">
                                    {SORT_OPTIONS.map((sort) => <option key={sort.id} value={sort.id}>{sort.label}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                                    <SlidersHorizontal className="w-3.5 h-3.5" /> Key Perks / Features
                                </label>
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                    {perkOptions.map(({ key, label, icon, title }) => (
                                        <button
                                            key={key}
                                            onClick={() => togglePerk(key)}
                                            title={title}
                                            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                                                perks[key]
                                                    ? "bg-zinc-800 border-zinc-500 text-zinc-100 font-semibold"
                                                    : "bg-zinc-950 border-white/10 text-zinc-400 hover:text-white"
                                            }`}>
                                            {icon} {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {activeFiltersCount > 0 && (
                            <div className="mb-6 flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                                <span className="text-zinc-400 font-medium">Active filters ({activeFiltersCount}):</span>
                                {activeTags.map((tag) => (
                                    <span key={tag.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700">
                                        {tag.label}
                                        <button onClick={() => updateFilter(tag.remove)} className="hover:text-white cursor-pointer" title="Remove filter">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                                <button onClick={resetAll} className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer">
                                    <RotateCcw className="w-3 h-3" /> Reset All
                                </button>
                            </div>
                        )}
                    </>
                )}

                {displayedCards.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                                categoryTag={getCardPrimaryCategory(card)}
                                benefits={[
                                    { icon: <Plane className="w-4 h-4" />, lable: card.lounge_access },
                                    { icon: <Fuel className="w-4 h-4" />, lable: card.fuel_benefits },
                                    { icon: <UtensilsCrossed className="w-4 h-4" />, lable: card.dining },
                                    { icon: <Shield className="w-4 h-4" />, lable: card.insurance },
                                ]}
                                rewards={card.reward_rate}
                                summary={card.summary}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-white/15 bg-white/5 text-center">
                        <div className="size-16 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 mb-4">
                            <SearchX className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No credit cards match your search</h3>
                        <p className="text-sm text-zinc-400 max-w-md mb-6">
                            We couldn&apos;t find any cards matching your current filters. Try clearing some filters or searching for something else.
                        </p>
                        <Button onClick={resetAll} className="px-6 py-2.5 text-sm bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-xl transition-colors cursor-pointer flex items-center gap-2">
                            <RotateCcw className="w-4 h-4" /> Reset All Filters
                        </Button>
                    </div>
                )}

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {hasMore && (
                        <Button onClick={() => setVisibleCount((count) => Math.min(count + (limit ?? 8), filteredCards.length))} className="px-8 py-2.5 text-sm bg-gray-400/10 hover:bg-gray-400/15 border border-white/20 text-white rounded-xl transition-colors cursor-pointer">
                            Load More {showSearchAndFilters ? `(${filteredCards.length - visibleCount} remaining)` : ""}
                        </Button>
                    )}
                    {limit && (
                        <Link href="/cards" className="inline-flex items-center gap-1.5 text-sm text-zinc-300 hover:text-white font-medium transition-colors">
                            Explore all {rawCards.length} cards in All Cards section
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};
