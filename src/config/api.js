export const TrendingCoins = (curr) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`

export const CoinList = (curr) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;
