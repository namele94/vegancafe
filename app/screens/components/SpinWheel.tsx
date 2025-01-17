import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  Animated,
  AppState,
} from 'react-native';
import {Easing} from 'react-native-reanimated';
import COLORS from '../../styles/colors.ts';
import {observer} from 'mobx-react';
import {useStore} from '../../stores/StoreContext.tsx';

const calculateResult = (finalAngle: any, sectors: any) => {
  const totalSectors = sectors.length;
  const sectorAngle = 360 / totalSectors;
  const normalizedAngle = ((finalAngle % 360) + 360) % 360;
  const adjustedAngle = (normalizedAngle + sectorAngle / 2) % 360;
  const index = Math.floor(adjustedAngle / sectorAngle);
  return sectors[index];
};

const spinLogo = require('../../assets/spin.png');
const cursorLogo = require('../../assets/cursor.png');

const SpinWheel = () => {
  const [rotation, setRotation] = useState(new Animated.Value(0));
  const [isSpinning, setIsSpinning] = useState(false);
  const [timer, setTimer] = useState(null);
  const {
    remainingTime,
    setRemainingTime,
    result,
    setResult,
    updateRemainingTime,
  } = useStore().productStore;

  const sectors = [
    '20%',
    'Empty',
    '15%',
    'Empty',
    'One meal free',
    'Empty',
    '$5',
    'Empty',
    '$12',
    'Empty',
    '10%',
    'Empty',
    '$12',
    'Empty',
    '10%',
    'Empty',
  ];

  useEffect(() => {
    if (remainingTime > 0) {
      updateRemainingTime();

      const interval = setInterval(() => {
        updateRemainingTime();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingTime]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        updateRemainingTime();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const formatTime = (seconds: any) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}h`;
  };

  const spin = () => {
    if (isSpinning || remainingTime > 0) {
      return;
    }

    setIsSpinning(true);
    setResult(null);

    const randomDegree = Math.floor(Math.random() * 360) + 720;

    Animated.timing(rotation, {
      toValue: randomDegree,
      duration: 4000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      const finalAngle = randomDegree % 360;
      const resultSector = calculateResult(finalAngle, sectors);

      setResult(resultSector);
      setIsSpinning(false);
      // @ts-ignore
      setTimer(Date.now() + 24 * 60 * 60 * 1000);
      setRemainingTime(24 * 60 * 60);

      rotation.setValue(finalAngle);
    });
  };

  const interpolatedRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {remainingTime > 0 ? (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
        </View>
      ) : (
        <Pressable onPress={spin} style={styles.spinBtn}>
          <Text style={styles.spinBtnText}>Spin</Text>
        </Pressable>
      )}

      <View style={styles.spinnerContainer}>
        <Animated.Image
          source={spinLogo}
          style={[styles.wheel, {transform: [{rotate: interpolatedRotation}]}]}
        />
        <Image source={cursorLogo} style={styles.arrow} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheel: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  arrow: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
    top: 0,
  },
  spinButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
  },
  spinText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultText: {
    marginTop: 20,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  spinBtn: {
    alignSelf: 'flex-end',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginRight: 14,
  },
  spinBtnText: {
    color: COLORS.primary,
  },
  timerContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginRight: 14,
  },
  timerText: {
    color: COLORS.primary,
  },
});

export default observer(SpinWheel);
