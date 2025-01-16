import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Product} from '../types';
import COLORS from '../styles/colors.ts';
import {useStore} from '../stores/StoreContext.tsx';
import CounterButton from './CounterButton.tsx';
import FastImage from 'react-native-fast-image';
import {observer} from 'mobx-react';

const ProductCard = ({item}: {item: Product}) => {
  const {productStore} = useStore();
  const {handleMinus, handlePlus} = productStore;
  const quantity = productStore.getItemQuantity(item.id);

  const handleAddToCart = () => {
    productStore.handlePlus(item);
  };

  return (
    <View style={styles.card}>
      <ImageBackground source={{uri: item.image}} style={styles.image}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.header}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc} numberOfLines={1}>
                {item.description}
              </Text>
              <Text style={styles.desc} numberOfLines={1}>
                {item.calories}, {item.weight}
              </Text>
            </View>
          </View>
          <View style={styles.counterContainer}>
            {quantity === 0 ? (
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            ) : (
              <CounterButton
                value={quantity}
                minus={() => handleMinus(item.id)}
                plus={() => handlePlus(item)}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const textBg = 'rgba(57,31,31,0.65)';
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  header: {
    justifyContent: 'space-between',
    marginTop: 6,
    marginLeft: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
  },
  name: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
  },
  desc: {
    color: COLORS.white,
    fontWeight: '400',
    fontSize: 12,
  },
  details: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  counterContainer: {
    width: '30%',
    alignContent: 'flex-end',
  },
  addButton: {
    padding: 10,
    margin: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: COLORS.primary,
  },
  icon: {
    width: 18,
    height: 18,
  },
  nameContainer: {
    paddingLeft: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cart: {
    width: 52,
    height: 52,
  },
  weight: {
    color: COLORS.grayText,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: textBg,
    paddingVertical: 10,
  },
  titleContainer: {
    width: '69%',
  },
  priceContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: textBg,
    padding: 12,
    borderBottomLeftRadius: 12,
  },
});

export default observer(ProductCard);
