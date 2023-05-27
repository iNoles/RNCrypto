export interface Crypto {
  data: [Data];
}

export interface Data {
  name: string;
  symbol: string;
  price_usd: string;
  nameid: string;
  percent_change_7d: string;
}
