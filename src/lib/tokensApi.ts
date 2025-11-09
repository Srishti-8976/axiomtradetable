export type Category = "new" | "final" | "migrated";

export interface TokenDTO {
  name: string;
  symbol: string;
  price: number;
  change: number;
  category: Category;
}

export async function fetchTokens(): Promise<TokenDTO[]> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 1200));
  return [
    { name: "BTC",  symbol: "BTC",  price: 64564.14, change: 1.5,  category: "final" },
    { name: "DOGE", symbol: "DOGE", price: 0.18,    change: -1.1, category: "new"   },
    { name: "ETH",  symbol: "ETH",  price: 3405.23, change: 2.3,  category: "migrated" },
    { name: "SOL",  symbol: "SOL",  price: 182.45,  change: -0.8, category: "new"   },
    { name: "BNB",  symbol: "BNB",  price: 580.14,  change: 0.9,  category: "final" },
  ];
}
