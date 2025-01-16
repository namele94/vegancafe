import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {observer} from 'mobx-react';
import COLORS from '../styles/colors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyImageBg from '../components/MyImageBg.tsx';
import CartButton from '../components/CartButton.tsx';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../stores/StoreContext.tsx';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header.tsx';
import {BORDER_RADIUS} from '../styles/constants.ts';

interface MenuScreenProps {
  navigation: any;
}

const MenuScreen: React.FC<MenuScreenProps> = props => {
  const {cart, cartTotal} = useStore().productStore;

  function navToCart() {
    props.navigation.navigate('CartStack');
  }

  return (
    <MyImageBg>
      <SafeAreaView edges={['top']} style={styles.mainContainer}>
        <Header title={'My basket'} />
        <View style={styles.menuContainer}>
          {cart.length > 0 ? (
            <View>
              <View style={styles.goBasketContainer}>
                <Pressable onPress={navToCart} style={styles.goBasketButton}>
                  <Text style={styles.goBasketTitle}>Go basket</Text>
                </Pressable>
                <Image
                  source={require('../assets/empty.png')}
                  style={{width: 131, height: 131}}
                />
              </View>
              <View style={styles.emptyTextContainer}>
                <Text style={styles.emptyText1}>
                  You have added {cart.length} position
                </Text>
                <Text style={styles.emptyText2}>
                  Total amount: ${cartTotal}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../assets/empty.png')}
                style={{width: 182, height: 182}}
              />
              <Text style={styles.emptyText}>
                {'You have an empty\nshopping cart'}
              </Text>
            </View>
          )}
          <ItemButton title={'Shop'} targetScreen={'Shop'} />
          <ItemButton title={'Reservation'} targetScreen={'Reservation'} />
          <ItemButton title={'Contacts'} targetScreen={'Contacts'} />
          <ItemButton title={'My bonus'} targetScreen={'Bonuses'} />
        </View>
        <View
          style={{paddingBottom: 80, paddingRight: 20, alignSelf: 'flex-end'}}>
          <CartButton iconSize={64} />
        </View>
      </SafeAreaView>
    </MyImageBg>
  );
};

const ItemButton = ({
  title,
  targetScreen,
  bgColor,
}: {
  title: string;
  targetScreen: string;
  bgColor?: string;
}) => {
  const navigation: any = useNavigation();
  return (
    <Pressable
      style={[styles.menuItem, {backgroundColor: bgColor ?? COLORS.white}]}
      onPress={() => navigation.navigate(targetScreen)}>
      <Text style={styles.menuText}>{title}</Text>
    </Pressable>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 1,
    color: COLORS.white,
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    width: width * 0.8,
    borderRadius: BORDER_RADIUS,
    marginBottom: 25,
  },
  menuText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  icon: {
    width: 90,
    height: 90,
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginBottom: 60,
    marginRight: 20,
  },
  counter: {
    backgroundColor: COLORS.secondary,
    padding: 3,
    paddingHorizontal: 7,
    borderRadius: 100,
    position: 'relative',
    bottom: width * 0.08,
    right: 5,
  },
  counterText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  profileTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  profileTitleContainer: {
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  editBtn: {
    backgroundColor: COLORS.white,
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 30,
    alignSelf: 'flex-end',
  },
  emptyText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },
  goBasketContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  goBasketButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  goBasketTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText1: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 700,
    opacity: 0.5,
  },
  emptyText2: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 500,
    marginTop: 8,
  },
  emptyTextContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
});

export default observer(MenuScreen);
