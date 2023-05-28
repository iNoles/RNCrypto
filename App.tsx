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
import {getCoins} from './api';
import {ImageProps, PriceProps, getCoinImage, toUSD} from './utils';

function App(): JSX.Element {
  const [coins, setCoins] = useState<Crypto>();
  useEffect(() => {
    getCoins().then(crypto => setCoins(crypto));
  }, []);

  const loadListImage = (props: ImageProps, coin: string) => {
    return <List.Image {...props} source={{uri: getCoinImage(coin)}} />;
  };

  const fetchPrice = (props: PriceProps, price: string) => {
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
            left={props => loadListImage(props, item.nameid)}
            right={props => fetchPrice(props, item.price_usd)}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default App;
