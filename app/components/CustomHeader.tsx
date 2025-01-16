import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CartButton from './CartButton.tsx';
import COLORS from '../styles/colors.ts';

const CustomHeader = ({
  title,
  showCart,
  showMenu,
  showBack,
}: {
  title: string;
  showCart?: boolean;
  showMenu?: boolean;
  showBack?: boolean;
}) => {
  const navigation: any = useNavigation();

  function navToMenu() {
    navigation.navigate('Menu');
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.cartContainer}>
          {showBack && (
            <Pressable onPress={navigation.goBack} style={styles.backBtn}>
              <Text style={styles.backBtnTitle}>Back</Text>
            </Pressable>
          )}
          {showCart && <CartButton iconSize={48} />}
          {showMenu && (
            <Pressable onPress={navToMenu}>
              <Image
                source={require('../assets/menu.png')}
                style={{
                  width: 48,
                  height: 48,
                  resizeMode: 'contain',
                  marginLeft: 10,
                }}
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    width: width,
    height: width * 0.3,
    justifyContent: 'flex-end',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
  backIcon: {
    width: 52,
    height: 52,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: COLORS.white,
    marginLeft: 10,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FF00FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 18,
    height: 18,
    backgroundColor: 'orange',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  backBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 18,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
