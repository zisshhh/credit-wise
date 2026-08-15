
export type CardData = "indigo" | "emerald" | "slate" | "sky" | "amber" | "rose";

export interface CardDataProps {
    id: number;
    image: string
    bank: string;
    name: string;
    annual_fee: number;
    joining_fee: number;
    eligibility: string;
    is_premium: boolean;
    reward_rate: string;
    cashback: {
        fuel: string;
        online: string;
    };
    lounge_access: string;
    fuel_benefits: string;
    dining: string;
    insurance: string
    summary: string
}

export interface CreditCardDivProps {
    image: string
    cardName: string
    bankName: string
    annualFee?: number
    minIncome: string
    rating: number
    isPremium?: boolean
    benefits: { icon: React.ReactNode; lable: string }[];
    rewards: string
    summary: string
}