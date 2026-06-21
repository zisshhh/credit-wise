
export interface CardData {
    id: number;
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