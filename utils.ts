import {Style} from 'react-native-paper/lib/typescript/src/components/List/utils';

function toUSD(price: string) {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

const getCoinImage = (coin: string) => {
  return `https://c1.coinlore.com/img/50x50/${coin.toLowerCase()}.png`;
};

interface ImageProps {
  color: string;
  style: Style;
}

interface PriceProps {
  color: string;
  style?: Style | undefined;
}

export type {ImageProps, PriceProps};

export {toUSD, getCoinImage};
