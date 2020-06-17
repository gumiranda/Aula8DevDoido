import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CardView} from 'react-native-credit-card-input';
import appMetrics from '../../utils/appMetrics';
import {appColors} from '../../utils/appColors';

const ratio = 228 / 362;
export const CARD_WIDTH = appMetrics.DEVICE_WIDTH * 0.83;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: appColors.transparent,
  },
});

export default ({cardNumber, name, brand}) => {
  return (
    <View style={styles.card}>
      <CardView scale={0.94} brand={brand} name={name} number={cardNumber} />
    </View>
  );
};
