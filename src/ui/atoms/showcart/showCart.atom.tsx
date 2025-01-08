import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './showCart.styles';

interface Product {
    id:number;
    title:string;
    price: number;
quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
    }

interface ShowCart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

interface ShowCartCardProps {
    showCart: ShowCart;
    }
const ShowCart = ({showCart}: ShowCartCardProps)=>{
    return (
        <>
        <View style={styles.container}>
        <Text style={styles.titleStyle}>USER CART: {showCart.userId}</Text>
                <View style={styles.containerImage}>
                  <Image
                    source={{
                      uri: 'https://www.pngall.com/wp-content/uploads/5/Empty-Red-Shopping-Cart-PNG-Picture.png',
                    }}
                    style={styles.imageStyle}
                  />
                  </View>
                   <Text style={styles.genericCardText}>Cart products: {showCart.totalProducts}</Text>
                          <Text style={[styles.genericCardText, styles.genericCardTextSpacing]}>
                            Total cost: {showCart.total} $
                          </Text>
        </View>
        </>
        )
    };
export default memo(ShowCart);