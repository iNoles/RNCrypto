import {Crypto} from './crypto';

const API_URL = 'https://api.coinlore.net/api/tickers/';

const getCoins = async () => {
  try {
    const response = await fetch(API_URL);
    const json = (await response.json()) as Crypto;
    return json;
  } catch (error) {
    console.error(error);
  }
};

export {getCoins};
