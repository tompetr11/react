import React, { memo, useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './cart.styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { storage } from '../../../core/storage/storage';

const PREFERRED_CARTS = 'preferred_carts';

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

interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

interface CartCardProps {
  cart: Cart;
  onPress: () => void;
  onHeartClick: (cartId: number) => void;
}




   
  
const Card = ({ cart, onPress, onHeartClick }: CartCardProps) => {

  const [active, setActive] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

const loadFavorites = useCallback(async ()=> {
  try {
    const storedFavorites =await storage.getItem(PREFERRED_CARTS);
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    setFavoriteIds(parsedFavorites);
    setActive(parsedFavorites.includes(cart.id)); 
  }catch (error) {
    console.error('Errore nel caricamento dei preferiti:', error);
  }
},[cart.id]);

useEffect(()=>{
  loadFavorites();
},[loadFavorites])

const addFavorite =useCallback(
  async(item:Cart)=>{
    const updateFavorites =favoriteIds.includes(item.id)
    ? favoriteIds.filter((id)=>id !==item.id)
    :[...favoriteIds, item.id];

    setFavoriteIds(updateFavorites);
    await storage.setitem(PREFERRED_CARTS, JSON.stringify(updateFavorites));
  },
  [favoriteIds]
);
  const handleHeartPress = () => {
    setActive(!active);
    addFavorite(cart)
    onHeartClick(cart.id); 
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>USER CART: {cart.userId}</Text>
        <AntDesign name={active ? "heart" : "hearto"} style={styles.heartStyle} isActive={active} onPress={handleHeartPress} animationScale = {1.25}/>
        <View style={styles.containerImage}>
          <Image
            source={{
              uri: 'https://www.pngall.com/wp-content/uploads/5/Empty-Red-Shopping-Cart-PNG-Picture.png',
            }}
            style={styles.imageStyle}
          />
        </View>
        <Text style={styles.genericCardText}>Cart products: {cart.totalProducts}</Text>
        <Text style={[styles.genericCardText, styles.genericCardTextSpacing]}>
          Total cost: {cart.total} $
        </Text>
      </View>

      <TouchableOpacity style={styles.buyCartButton} onPress={onPress}>
        <Text style={styles.genericCardText}>BUY CART {cart.discountedTotal} $</Text>
      </TouchableOpacity>
    </>
  );
};

export default memo(Card);
