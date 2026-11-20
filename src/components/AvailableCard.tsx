"use client";

import { useState, useMemo } from "react";
import data from "@/data/cards.json";
import { CardDiv } from "./CardDiv";
import {
    Search,
    X,
    SlidersHorizontal,
    CreditCard,
    Plane,
    Fuel,
    UtensilsCrossed,
    Shield,
    Gift,
    Sparkles,
    Crown,
    Percent,
    Star,
    RotateCcw,
    Building2,
    Banknote,
    ArrowUpDown,
    Check,
    ArrowRight,
    SearchX,
} from "lucide-react";
import { Button } from "./ui/button";
import {
    CardTypeCategory,
    CARD_TYPE_OPTIONS,
    BANK_OPTIONS,
    FEE_RANGE_OPTIONS,
    SORT_OPTIONS,
    FeeRange,
    SortOption,
    PerkFilters,
    filterAndSortCards,
    getTypeCounts,
    getCardPrimaryCategory,
} from "@/lib/card-filters";
import { CardDataProps } from "@/types";
import Link from "next/link";

interface AvailableCardProps {
    limit?: number;
}

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

export const AvailableCard = ({ limit }: AvailableCardProps) => {
    const rawCards = (data[0] || []) as CardDataProps[];

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<CardTypeCategory>("all");
    const [selectedBank, setSelectedBank] = useState("All Banks");
    const [selectedFeeRange, setSelectedFeeRange] = useState<FeeRange>("all");
    const [selectedSort, setSelectedSort] = useState<SortOption>("featured");
    const [perks, setPerks] = useState<PerkFilters>({
        lounge: false,
        fuel: false,
        dining: false,
        insurance: false,
        highRating: false,
    });
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // Initial limit: if limit is provided (like Home page), use it; else start with 12
    const initialBatch = limit ?? 12;
    const [visibleCount, setVisibleCount] = useState<number>(initialBatch);

    // Dynamic counts per category based on raw catalog
    const typeCounts = useMemo(() => getTypeCounts(rawCards), [rawCards]);

    // Filter and sort cards
    const filteredCards = useMemo(() => {
        return filterAndSortCards(rawCards, {
            query: searchQuery,
            type: selectedType,
            bank: selectedBank,
            feeRange: selectedFeeRange,
            perks,
            sortBy: selectedSort,
        });
    }, [rawCards, searchQuery, selectedType, selectedBank, selectedFeeRange, perks, selectedSort]);

    // Displayed cards
    const displayedCards = useMemo(() => {
        return filteredCards.slice(0, visibleCount);
    }, [filteredCards, visibleCount]);

    const hasMore = visibleCount < filteredCards.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + (limit ?? 8), filteredCards.length));
    };

    const handleResetAll = () => {
        setSearchQuery("");
        setSelectedType("all");
        setSelectedBank("All Banks");
        setSelectedFeeRange("all");
        setSelectedSort("featured");
        setPerks({
            lounge: false,
            fuel: false,
            dining: false,
            insurance: false,
            highRating: false,
        });
        setVisibleCount(initialBatch);
    };

    const handleTypeSelect = (typeId: CardTypeCategory) => {
        setSelectedType(typeId);
        setVisibleCount(initialBatch);
    };

    const togglePerk = (key: keyof PerkFilters) => {
        setPerks((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
        setVisibleCount(initialBatch);
    };

    // Calculate active filter count
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (searchQuery.trim()) count++;
        if (selectedType !== "all") count++;
        if (selectedBank !== "All Banks") count++;
        if (selectedFeeRange !== "all") count++;
        if (selectedSort !== "featured") count++;
        count += Object.values(perks).filter(Boolean).length;
        return count;
    }, [searchQuery, selectedType, selectedBank, selectedFeeRange, selectedSort, perks]);

    // Quick suggestions under search bar
    const quickSuggestions = [
        {
            label: "5% Cashback",
            apply: () => {
                setSearchQuery("cashback");
                setSelectedType("cashback");
                setVisibleCount(initialBatch);
            },
        },
        {
            label: "Airport Lounge",
            apply: () => {
                setSelectedType("travel");
                setPerks((p) => ({ ...p, lounge: true }));
                setVisibleCount(initialBatch);
            },
        },
        {
            label: "Lifetime Free (₹0)",
            apply: () => {
                setSelectedType("free");
                setSelectedFeeRange("free");
                setVisibleCount(initialBatch);
            },
        },
        {
            label: "HDFC Bank",
            apply: () => {
                setSelectedBank("HDFC");
                setVisibleCount(initialBatch);
            },
        },
        {
            label: "American Express",
            apply: () => {
                setSelectedBank("American Express");
                setVisibleCount(initialBatch);
            },
        },
        {
            label: "Under ₹1,000",
            apply: () => {
                setSelectedFeeRange("under-1k");
                setVisibleCount(initialBatch);
            },
        },
        {
            label: "Premium Luxury",
            apply: () => {
                setSelectedType("premium");
                setVisibleCount(initialBatch);
            },
        },
    ];

    return (
        <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Available Credit Cards
                        </h2>
                        <p className="mt-2 text-zinc-400 max-w-2xl text-sm sm:text-base">
                            Search and compare cards across cashback, airport lounge travel, zero fee, rewards, and luxury tiers to find your ideal match.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium bg-white/5 border border-white/10 px-4 py-2 rounded-xl self-start md:self-auto">
                        <span>Showing</span>
                        <span className="text-white font-semibold">{displayedCards.length}</span>
                        <span>of</span>
                        <span className="text-blue-400 font-semibold">{filteredCards.length}</span>
                        <span>{filteredCards.length === 1 ? "card" : "cards"}</span>
                        {rawCards.length !== filteredCards.length && (
                            <span className="text-zinc-500 text-xs">({rawCards.length} total)</span>
                        )}
                    </div>
                </div>

                {/* Search Bar & Quick Suggestions */}
                <div className="mb-6 space-y-3">
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setVisibleCount(initialBatch);
                            }}
                            placeholder="Search by card name, bank, rewards, lounge, cashback, 'Amex', 'Millennia', 'fuel'..."
                            className="w-full pl-12 pr-28 py-3.5 bg-zinc-900/90 hover:bg-zinc-900 focus:bg-zinc-950 border border-white/20 focus:border-blue-500 rounded-2xl text-white placeholder:text-zinc-500 outline-none transition-all duration-200 text-sm sm:text-base shadow-inner"
                        />
                        <div className="absolute right-3 flex items-center gap-1.5">
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setVisibleCount(initialBatch);
                                    }}
                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    title="Clear search"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${showAdvancedFilters || activeFiltersCount > 0
                                    ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                                    : "bg-white/10 text-zinc-300 border-white/15 hover:bg-white/15"
                                    }`}
                                title="Toggle additional filters"
                            >
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Filters</span>
                                {activeFiltersCount > 0 && (
                                    <span className="size-4.5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-zinc-400">
                        <span className="shrink-0 text-zinc-500 font-medium">Quick searches:</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {quickSuggestions.map((sug, i) => (
                                <button
                                    key={i}
                                    onClick={sug.apply}
                                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white transition-all cursor-pointer whitespace-nowrap text-xs"
                                >
                                    {sug.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card Type Selector - Dedicated section for searching type of cards */}
                <div className="mb-6">
                    <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2.5 flex items-center gap-2">
                        <span>Filter by Card Type</span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {CARD_TYPE_OPTIONS.map((type) => {
                            const isSelected = selectedType === type.id;
                            const count = typeCounts[type.id] ?? 0;

                            return (
                                <button
                                    key={type.id}
                                    onClick={() => handleTypeSelect(type.id)}
                                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 shrink-0 cursor-pointer ${isSelected
                                        ? "bg-white/10 text-white border-white/20 shadow-sm font-semibold"
                                        : "bg-[#111111] text-gray-400 border-[#252525] hover:bg-[#1A1A1A]"
                                        }`}
                                    title={type.description}
                                >
                                    <span className={isSelected ? "text-zinc-100" : "text-zinc-400"}>
                                        {typeIcons[type.id]}
                                    </span>
                                    <span>{type.label}</span>
                                    <span
                                        className={`px-1.5 py-0.5 rounded-full text-[11px] font-semibold ${isSelected
                                            ? "bg-white/30 text-blue-200"
                                            : "bg-white/10 text-zinc-400"
                                            }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Filter and Sort Toolbar */}
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 mb-6 transition-all duration-300 ${showAdvancedFilters ? "block" : "hidden sm:grid"
                        }`}
                >
                    {/* Bank selector */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Issuing Bank</span>
                        </label>
                        <select
                            value={selectedBank}
                            onChange={(e) => {
                                setSelectedBank(e.target.value);
                                setVisibleCount(initialBatch);
                            }}
                            className="w-full bg-zinc-950 border border-white/15 focus:border-blue-500 text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors"
                        >
                            {BANK_OPTIONS.map((bank) => (
                                <option key={bank} value={bank} className="bg-zinc-900 text-white">
                                    {bank}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fee Range selector */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                            <Banknote className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Annual Fee</span>
                        </label>
                        <select
                            value={selectedFeeRange}
                            onChange={(e) => {
                                setSelectedFeeRange(e.target.value as FeeRange);
                                setVisibleCount(initialBatch);
                            }}
                            className="w-full bg-zinc-950 border border-white/15 focus:border-blue-500 text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors"
                        >
                            {FEE_RANGE_OPTIONS.map((fee) => (
                                <option key={fee.id} value={fee.id} className="bg-zinc-900 text-white">
                                    {fee.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort options */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Sort By</span>
                        </label>
                        <select
                            value={selectedSort}
                            onChange={(e) => {
                                setSelectedSort(e.target.value as SortOption);
                                setVisibleCount(initialBatch);
                            }}
                            className="w-full bg-zinc-950 border border-white/15 focus:border-blue-500 text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors"
                        >
                            {SORT_OPTIONS.map((sort) => (
                                <option key={sort.id} value={sort.id} className="bg-zinc-900 text-white">
                                    {sort.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quick Perks Toggles Button Area */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Key Perks / Features</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                            <button
                                onClick={() => togglePerk("lounge")}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${perks.lounge
                                    ? "bg-blue-500/20 border-blue-400 text-blue-300 font-semibold"
                                    : "bg-zinc-950 border-white/10 text-zinc-400 hover:text-white"
                                    }`}
                                title="Free airport lounge access"
                            >
                                <Plane className="w-3 h-3" />
                                <span>Lounge</span>
                            </button>
                            <button
                                onClick={() => togglePerk("fuel")}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${perks.fuel
                                    ? "bg-amber-500/20 border-amber-400 text-amber-300 font-semibold"
                                    : "bg-zinc-950 border-white/10 text-zinc-400 hover:text-white"
                                    }`}
                                title="Fuel surcharge waiver & fuel points"
                            >
                                <Fuel className="w-3 h-3" />
                                <span>Fuel</span>
                            </button>
                            <button
                                onClick={() => togglePerk("dining")}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${perks.dining
                                    ? "bg-purple-500/20 border-purple-400 text-purple-300 font-semibold"
                                    : "bg-zinc-950 border-white/10 text-zinc-400 hover:text-white"
                                    }`}
                                title="Dining offers & restaurant discounts"
                            >
                                <UtensilsCrossed className="w-3 h-3" />
                                <span>Dining</span>
                            </button>
                            <button
                                onClick={() => togglePerk("highRating")}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${perks.highRating
                                    ? "bg-yellow-500/20 border-yellow-400 text-yellow-300 font-semibold"
                                    : "bg-zinc-950 border-white/10 text-zinc-400 hover:text-white"
                                    }`}
                                title="Rated 4.5 or higher"
                            >
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                <span>4.5+ ★</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Active Filters Bar */}
                {activeFiltersCount > 0 && (
                    <div className="mb-6 flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                        <span className="text-zinc-400 font-medium">Active filters ({activeFiltersCount}):</span>

                        {searchQuery && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                <span>Query: &quot;{searchQuery}&quot;</span>
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="hover:text-white cursor-pointer"
                                    title="Remove query filter"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {selectedType !== "all" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                <span>Type: {CARD_TYPE_OPTIONS.find((t) => t.id === selectedType)?.label}</span>
                                <button
                                    onClick={() => setSelectedType("all")}
                                    className="hover:text-white cursor-pointer"
                                    title="Remove type filter"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {selectedBank !== "All Banks" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                <span>Bank: {selectedBank}</span>
                                <button
                                    onClick={() => setSelectedBank("All Banks")}
                                    className="hover:text-white cursor-pointer"
                                    title="Remove bank filter"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {selectedFeeRange !== "all" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                <span>Fee: {FEE_RANGE_OPTIONS.find((f) => f.id === selectedFeeRange)?.label}</span>
                                <button
                                    onClick={() => setSelectedFeeRange("all")}
                                    className="hover:text-white cursor-pointer"
                                    title="Remove fee filter"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {perks.lounge && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                <span>✈️ Lounge Access</span>
                                <button
                                    onClick={() => togglePerk("lounge")}
                                    className="hover:text-white cursor-pointer"
                                    title="Remove lounge filter"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {perks.fuel && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                <span>⛽ Fuel Waiver</span>
                                <button
                                    onClick={() => togglePerk("fuel")}
                                    className="hover:text-white cursor-pointer"
                                    title="Remove fuel filter"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {perks.dining && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                <span>🍽️ Dining Perks</span>
                                <button
                                    onClick={() => togglePerk("dining")}
                                    className="hover:text-white cursor-pointer"
                                    title="Remove dining filter"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {perks.highRating && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                <span>⭐ 4.5+ Rating</span>
                                <button
                                    onClick={() => togglePerk("highRating")}
                                    className="hover:text-white cursor-pointer"
                                    title="Remove rating filter"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        <button
                            onClick={handleResetAll}
                            className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                        >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset All</span>
                        </button>
                    </div>
                )}

                {/* Card Results Grid */}
                {displayedCards.length > 0 ? (
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
                                    {
                                        icon: <Plane className="w-4 h-4" />,
                                        lable: card.lounge_access,
                                    },
                                    {
                                        icon: <Fuel className="w-4 h-4" />,
                                        lable: card.fuel_benefits,
                                    },
                                    {
                                        icon: <UtensilsCrossed className="w-4 h-4" />,
                                        lable: card.dining,
                                    },
                                    {
                                        icon: <Shield className="w-4 h-4" />,
                                        lable: card.insurance,
                                    },
                                ]}
                                rewards={card.reward_rate}
                                summary={card.summary}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State when no card matches search or filters */
                    <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-white/15 bg-white/5 text-center">
                        <div className="size-16 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 mb-4">
                            <SearchX className="w-8 h-8 text-zinc-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            No credit cards match your search
                        </h3>
                        <p className="text-sm text-zinc-400 max-w-md mb-6">
                            We couldn&apos;t find any cards matching your current combination of search keywords and filters. Try clearing some filters or searching for something else.
                        </p>
                        <Button
                            onClick={handleResetAll}
                            className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset All Filters
                        </Button>
                    </div>
                )}

                {/* Load More Button / Navigation */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {hasMore && (
                        <Button
                            onClick={handleLoadMore}
                            className="px-8 py-2.5 text-sm bg-gray-400/10 hover:bg-gray-400/15 border border-white/20 text-white rounded-xl transition-colors cursor-pointer"
                        >
                            Load More ({filteredCards.length - visibleCount} remaining)
                        </Button>
                    )}

                    {limit && filteredCards.length > displayedCards.length && (
                        <Link
                            href="/cards"
                            className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                            <span>Explore all {rawCards.length} cards in All Cards section</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};
