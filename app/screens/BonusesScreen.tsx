import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyImageBg from '../components/MyImageBg.tsx';
import COLORS from '../styles/colors.ts';
import CustomButton from '../components/CustomButton.tsx';
import {observer} from 'mobx-react';
import {useStore} from '../stores/StoreContext.tsx';
import {BORDER_RADIUS} from '../styles/constants.ts';
import SpinWheel from './components/SpinWheel.tsx';
import QRCode from 'react-native-qrcode-svg';

interface EventScreenProps {
  navigation: any;
}
const BonusesScreen: React.FC<EventScreenProps> = props => {
  const {productStore} = useStore();
  const {result} = productStore;
  const [showQr, setShowQr] = useState(true);

  function navToMenu() {
    props.navigation.navigate('Menu');
  }

  return (
    <MyImageBg>
      <SafeAreaView edges={['left', 'right']} style={styles.container}>
        <Text style={styles.topText}>
          Spin the wheel to win a discount or more
        </Text>
        <View style={[styles.container, {paddingTop: 40}]}>
          <Text style={styles.title}>
            The promotion is only valid on our menu
          </Text>
          {result !== null && (
            <Pressable
              onPress={() => setShowQr(!showQr)}
              style={styles.spinBtn}>
              <Text style={styles.spinBtnText}>
                {showQr ? 'Hide QR' : 'Show QR'}
              </Text>
            </Pressable>
          )}
          <View style={styles.gridContainer}>
            {(result === null || !showQr) && <SpinWheel />}
            {result && showQr && (
              <View style={styles.contentContainer}>
                <Text style={styles.successText}>
                  {result === 'Empty'
                    ? 'Sorry!\nYou’ve lost.'
                    : `Congratulations!\nYou've won ${result}`}
                </Text>

                <View style={styles.qrContainer}>
                  <QRCode
                    backgroundColor={'transparent'}
                    value={result}
                    size={180}
                    color={COLORS.black}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        <CustomButton
          containerStyle={styles.button}
          title={'Back to menu'}
          onPress={navToMenu}
        />
      </SafeAreaView>
    </MyImageBg>
  );
};

export default observer(BonusesScreen);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
  },
  cardTitle: {
    color: COLORS.white,
    fontWeight: 700,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  aboutText: {
    color: COLORS.white,
    fontWeight: '500',
    marginHorizontal: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  itemContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemSubTitle: {
    color: COLORS.grayText,
    marginVertical: 10,
  },
  listTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 40,
    marginLeft: 20,
  },
  invalidCode: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 4,
    color: COLORS.error,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    paddingHorizontal: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayText,
    margin: 8,
  },
  refContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS,
    width: '90%',
    backgroundColor: COLORS.white,
    marginVertical: 12,
    marginHorizontal: 20,
  },
  close: {
    width: 16,
    height: 16,
  },
  refText: {
    width: '92%',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  topContainer: {
    alignItems: 'center',
  },
  presentIcon: {
    width: 198,
    height: 198,
  },
  presentItemContainer: {
    backgroundColor: COLORS.transparentBg,
    width: 115,
    height: 122,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  gridItem: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.transparentBg,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: 40,
    height: 40,
    tintColor: COLORS.white,
    resizeMode: 'contain',
  },
  giftIcon: {
    width: 70,
    height: 70,
    tintColor: COLORS.primary,
  },
  modalWrapContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 99999,
    elevation: 1000,
    width: width,
    height: height,
    paddingHorizontal: 8,
  },
  modalContainer: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 40,
  },
  topText: {
    color: COLORS.white,
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 40,
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingBottom: 20,
    width: '80%',
  },
  successText: {
    marginTop: 10,
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 32,
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
});
