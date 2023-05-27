/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {Crypto} from './crypto';
import {Appbar, List, Text} from 'react-native-paper';
import {Style} from 'react-native-paper/lib/typescript/src/components/List/utils';

function App(): JSX.Element {
  const [coins, setCoins] = useState<Crypto>();
  const getCoins = async () => {
    try {
      const response = await fetch('https://api.coinlore.net/api/tickers/');
      const json = (await response.json()) as Crypto;
      setCoins(json);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCoins();
  }, []);
  const coinToIcons = (coin: string) => {
    return `https://c1.coinlore.com/img/50x50/${coin.toLowerCase()}.png`;
  };

  const loadListIcon = (props: {color: string; style: Style}, coin: string) => {
    return <List.Image {...props} source={{uri: coinToIcons(coin)}} />;
  };

  function toUSD(price: string) {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  const fetchPrice = (
    props: {color: string; style?: Style | undefined},
    price: string,
  ) => {
    return <Text {...props}>{toUSD(price)}</Text>;
  };

  return (
    <SafeAreaView>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Cryptocurrencies" />
      </Appbar.Header>
      <FlatList
        data={coins?.data}
        keyExtractor={item => item.symbol}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            description={item.symbol}
            left={props => loadListIcon(props, item.nameid)}
            right={props => fetchPrice(props, item.price_usd)}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default App;
