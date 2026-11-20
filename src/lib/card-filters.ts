import { CardDataProps } from "@/types";

export type CardTypeCategory =
    | "all"
    | "cashback"
    | "travel"
    | "rewards"
    | "free"
    | "premium"
    | "dining"
    | "fuel";

export type FeeRange = "all" | "free" | "under-1k" | "1k-5k" | "above-5k";

export type SortOption =
    | "featured"
    | "rating-desc"
    | "fee-asc"
    | "fee-desc"
    | "name-asc";

export interface PerkFilters {
    lounge?: boolean;
    fuel?: boolean;
    dining?: boolean;
    insurance?: boolean;
    highRating?: boolean;
}

export interface FilterState {
    query: string;
    type: CardTypeCategory;
    bank: string;
    feeRange: FeeRange;
    perks: PerkFilters;
    sortBy: SortOption;
}

export interface CardTypeOption {
    id: CardTypeCategory;
    label: string;
    description: string;
}

export const CARD_TYPE_OPTIONS: CardTypeOption[] = [
    { id: "all", label: "All Types", description: "Browse every credit card in our catalog" },
    { id: "cashback", label: "Cashback", description: "Direct money back on online shopping and spends" },
    { id: "travel", label: "Travel & Lounge", description: "Complimentary airport lounge access and travel perks" },
    { id: "rewards", label: "Rewards & Points", description: "Earn accelerated points on shopping, milestones, and dining" },
    { id: "free", label: "Lifetime Free", description: "Zero annual fee and zero maintenance charges forever" },
    { id: "premium", label: "Premium & Luxury", description: "Elite luxury cards with concierge and high-end benefits" },
    { id: "dining", label: "Dining & Food", description: "Gourmet privileges, Swiggy/Zomato discounts, and dining perks" },
    { id: "fuel", label: "Fuel & Commute", description: "Fuel surcharge waivers and fuel reward points" },
];

export const BANK_OPTIONS = [
    "All Banks",
    "American Express",
    "HDFC",
    "SBI",
    "ICICI",
    "Axis",
    "HSBC",
    "IndusInd",
    "IDFC FIRST",
];

export const FEE_RANGE_OPTIONS: { id: FeeRange; label: string }[] = [
    { id: "all", label: "All Fees" },
    { id: "free", label: "Lifetime Free (₹0)" },
    { id: "under-1k", label: "Under ₹1,000" },
    { id: "1k-5k", label: "₹1,000 - ₹5,000" },
    { id: "above-5k", label: "Above ₹5,000" },
];

export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
    { id: "featured", label: "Featured / Recommended" },
    { id: "rating-desc", label: "Highest Rated (★)" },
    { id: "fee-asc", label: "Annual Fee: Low to High" },
    { id: "fee-desc", label: "Annual Fee: High to Low" },
    { id: "name-asc", label: "Card Name: A to Z" },
];

export function getCardCategories(card: CardDataProps): CardTypeCategory[] {
    const types: CardTypeCategory[] = [];
    const name = (card.name || "").toLowerCase();
    const reward = (card.reward_rate || "").toLowerCase();
    const online = (card.cashback?.online || "").toLowerCase();
    const lounge = (card.lounge_access || "").toLowerCase();
    const fuel = (card.fuel_benefits || "").toLowerCase();
    const dining = (card.dining || "").toLowerCase();
    const summary = (card.summary || "").toLowerCase();

    // Lifetime Free (₹0 fee)
    if (card.annual_fee === 0) {
        types.push("free");
    }

    // Cashback cards
    if (
        name.includes("cashback") ||
        name.includes("cash card") ||
        name.includes("ace") ||
        name.includes("millennia") ||
        name.includes("amazon pay") ||
        name.includes("flipkart") ||
        name.includes("swiggy") ||
        name.includes("live+") ||
        online.includes("5%") ||
        online.includes("cashback") ||
        summary.includes("cashback")
    ) {
        types.push("cashback");
    }

    // Travel & Airport Lounge
    if (
        (lounge !== "none" && lounge !== "") ||
        name.includes("travel") ||
        name.includes("atlas") ||
        name.includes("vistara") ||
        reward.includes("miles") ||
        reward.includes("flight")
    ) {
        types.push("travel");
    }

    // Rewards & Points
    if (
        reward.includes("point") ||
        reward.includes("membership rewards") ||
        reward.includes("rewards") ||
        name.includes("moneyback") ||
        name.includes("simply") ||
        name.includes("gold") ||
        name.includes("platinum") ||
        name.includes("select") ||
        name.includes("prime") ||
        name.includes("coral")
    ) {
        types.push("rewards");
    }

    // Premium & Luxury
    if (card.is_premium || card.annual_fee >= 5000) {
        types.push("premium");
    }

    // Dining & Food
    if (
        name.includes("swiggy") ||
        name.includes("live+") ||
        dining.includes("premium dining") ||
        dining.includes("luxury dining") ||
        dining.includes("exclusive") ||
        dining.includes("swiggy") ||
        dining.includes("enhanced")
    ) {
        types.push("dining");
    }

    // Fuel & Commute
    if (
        name.includes("fuel") ||
        name.includes("oil") ||
        (fuel !== "none" && fuel !== "")
    ) {
        types.push("fuel");
    }

    return types;
}

export function getCardPrimaryCategory(card: CardDataProps): string {
    const cats = getCardCategories(card);
    if (card.annual_fee === 0) return "Lifetime Free";
    if (cats.includes("cashback")) return "Cashback";
    if (cats.includes("travel")) return "Travel & Lounge";
    if (cats.includes("rewards")) return "Rewards";
    if (cats.includes("premium")) return "Premium";
    if (cats.includes("dining")) return "Dining";
    if (cats.includes("fuel")) return "Fuel";
    return "Standard";
}

export function filterAndSortCards(
    cards: CardDataProps[],
    filters: FilterState
): CardDataProps[] {
    let result = [...cards];

    // 1. Full-text search
    if (filters.query.trim()) {
        const tokens = filters.query.toLowerCase().trim().split(/\s+/);
        result = result.filter((card) => {
            const searchableText = [
                card.name,
                card.bank,
                card.reward_rate,
                card.summary,
                card.eligibility,
                card.cashback?.online || "",
                card.cashback?.fuel || "",
                card.lounge_access,
                card.fuel_benefits,
                card.dining,
                card.insurance,
                getCardPrimaryCategory(card),
                card.annual_fee === 0 ? "free lifetime zero fee" : `fee ₹${card.annual_fee}`
            ]
                .join(" ")
                .toLowerCase();

            return tokens.every((token) => searchableText.includes(token));
        });
    }

    // 2. Card Type Filter
    if (filters.type !== "all") {
        result = result.filter((card) =>
            getCardCategories(card).includes(filters.type)
        );
    }

    // 3. Bank Filter
    if (filters.bank && filters.bank !== "All Banks") {
        result = result.filter(
            (card) => card.bank.toLowerCase() === filters.bank.toLowerCase()
        );
    }

    // 4. Annual Fee Range Filter
    if (filters.feeRange && filters.feeRange !== "all") {
        result = result.filter((card) => {
            if (filters.feeRange === "free") return card.annual_fee === 0;
            if (filters.feeRange === "under-1k")
                return card.annual_fee > 0 && card.annual_fee < 1000;
            if (filters.feeRange === "1k-5k")
                return card.annual_fee >= 1000 && card.annual_fee <= 5000;
            if (filters.feeRange === "above-5k") return card.annual_fee > 5000;
            return true;
        });
    }

    // 5. Specific Perk Filters
    if (filters.perks.lounge) {
        result = result.filter(
            (card) =>
                card.lounge_access &&
                card.lounge_access.toLowerCase() !== "none"
        );
    }
    if (filters.perks.fuel) {
        result = result.filter(
            (card) =>
                card.fuel_benefits &&
                card.fuel_benefits.toLowerCase() !== "none"
        );
    }
    if (filters.perks.dining) {
        result = result.filter(
            (card) =>
                card.dining &&
                card.dining.toLowerCase() !== "none" &&
                card.dining.toLowerCase() !== "limited offers"
        );
    }
    if (filters.perks.insurance) {
        result = result.filter(
            (card) =>
                card.insurance &&
                card.insurance.toLowerCase() !== "none"
        );
    }
    if (filters.perks.highRating) {
        result = result.filter((card) => card.rating >= 4.5);
    }

    // 6. Sorting
    switch (filters.sortBy) {
        case "rating-desc":
            result.sort((a, b) => b.rating - a.rating);
            break;
        case "fee-asc":
            result.sort((a, b) => a.annual_fee - b.annual_fee);
            break;
        case "fee-desc":
            result.sort((a, b) => b.annual_fee - a.annual_fee);
            break;
        case "name-asc":
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "featured":
        default:
            // Natural ranking with slight boost for premium cards
            break;
    }

    return result;
}

export function getTypeCounts(cards: CardDataProps[]): Record<CardTypeCategory, number> {
    const counts: Record<CardTypeCategory, number> = {
        all: cards.length,
        cashback: 0,
        travel: 0,
        rewards: 0,
        free: 0,
        premium: 0,
        dining: 0,
        fuel: 0,
    };

    cards.forEach((card) => {
        const types = getCardCategories(card);
        types.forEach((type) => {
            counts[type] = (counts[type] || 0) + 1;
        });
    });

    return counts;
}
