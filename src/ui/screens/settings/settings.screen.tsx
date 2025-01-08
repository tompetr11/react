import { Button, FlatList, ListRenderItem, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { settingsStyles } from './settings.styles';
import { styles } from '../home/home.styles';
import Card from '../../atoms/cart/cart.atom';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Settings>;
}
interface Response {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
const SettingsScreen = ({ navigation }: Props) => {

  const [carts, setCarts] = useState<Cart[]>([]);

  const handleHeartClick = (cartId: number) => {
    console.log('Cart ID clicked:', cartId);
  };
  // ** CALLBACKS ** //

  const renderItem = useCallback<ListRenderItem<Cart>>(
    ({ item }) => {
      return (
        <Card
          cart={item}
          onHeartClick={handleHeartClick}
          onPress={() => {
            if (!item.id) {
              return;
            }
            navigation.navigate(Screen.Detail, {
              id: item.id,
              idsArray: carts.map((el) => el.id),
            });
           
          }}
         
        />
      );
    },
    [carts, navigation]
  );
  const ItemSeparatorComponent = useCallback(() => <View style={styles.itemSeparator}></View>, []);
  useEffect(() => {
    fetch('https://dummyjson.com/carts')
      .then((res) => res.json())
      .then((response: Response) => setCarts(response.carts));
      //console.log('ciao'=>(storage.setitem('chiave_test','valore_test'));
  }, []);
  return (
    <View style={settingsStyles.container}>
      <Text>Schermata Settings</Text>
      <Button title={'Go to home'} onPress={() => navigation.navigate(Screen.Home)} />
      
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={carts}
        renderItem={renderItem}
      />
    </View>
    
  );
};

export default SettingsScreen;

