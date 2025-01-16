import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyImageBg from '../components/MyImageBg.tsx';
import ProgressBar from '../components/ProgressBar.tsx';
import COLORS from '../styles/colors.ts';
import {BORDER_RADIUS} from '../styles/constants.ts';
import {useStore} from '../stores/StoreContext.tsx';
import LoaderKit from 'react-native-loader-kit';

interface LoaderScreenProps {
  navigation: any;
}

const LoaderScreen: React.FC<LoaderScreenProps> = props => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      props.navigation.navigate('Menu');
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MyImageBg isLoader>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <View style={styles.mainContainer}>
          <Image
            source={require('../assets/appname.png')}
            style={{width: 254, height: 72, resizeMode: 'contain'}}
          />
        </View>
        {isLoading && (
          <LoaderKit
            style={{
              width: 60,
              height: 60,
              alignSelf: 'center',
              marginBottom: 20,
            }}
            name={'BallClipRotate'}
            color={COLORS.white}
          />
        )}
      </SafeAreaView>
    </MyImageBg>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: COLORS.white,
    padding: 24,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS,
    marginBottom: 80,
  },
  title: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: '700',
  },
  progressBar: {
    marginBottom: 60,
  },
  activityIndicator: {
    transform: [{scale: 1.5}],
  },
});

export default observer(LoaderScreen);
