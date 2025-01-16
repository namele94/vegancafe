import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CartScreen from '../../screens/Cart/CartScreen.tsx';
import ConfirmOrderScreen from '../../screens/Cart/ConfirmOrderScreen.tsx';
import CustomHeader from '../../components/CustomHeader.tsx';

const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        header: () => <CustomHeader title={'My Basket'} showBack showMenu />,
      })}>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen
        name="Order"
        component={ConfirmOrderScreen}
        options={() => ({
          header: () => <CustomHeader title={'My order'} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default CartStack;
