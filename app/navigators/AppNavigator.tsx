import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CartStack from './stacks/CartStack.tsx';
import ReservationSuccessScreen from '../screens/ReservationSuccessScreen.tsx';
import MenuScreen from '../screens/MenuScreen.tsx';
import HomeScreen from '../screens/HomeScreen.tsx';
import ReservationScreen from '../screens/ReservationScreen.tsx';
import ContactScreen from '../screens/ContactScreen.tsx';
import LoaderScreen from '../screens/LoaderScreen.tsx';
import CustomHeader from '../components/CustomHeader.tsx';
import BonusesScreen from '../screens/BonusesScreen.tsx';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loader"
          component={LoaderScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CartStack"
          component={CartStack}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Shop"
          component={HomeScreen}
          // @ts-ignore
        />
        <Stack.Screen
          name="Reservation"
          component={ReservationScreen}
          options={{
            header: () => <CustomHeader title={'Reservation'} showMenu />,
          }}
        />
        <Stack.Screen
          name="Contacts"
          component={ContactScreen}
          options={{
            header: () => <CustomHeader title={'Contacts'} />,
          }}
        />
        <Stack.Screen
          name="ReservationSuccessScreen"
          component={ReservationSuccessScreen}
          options={{
            header: () => <CustomHeader title={'Order'} />,
            title: 'Reservation',
          }}
        />
        <Stack.Screen
          name="Bonuses"
          // @ts-ignore
          component={BonusesScreen}
          options={{
            header: () => <CustomHeader title={'My bonus'} showMenu />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
