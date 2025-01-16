import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import COLORS from '../styles/colors.ts';

interface HeaderProps {
  title: string;
  containerStyle?: ViewStyle;
}

const Header = ({title, containerStyle}: HeaderProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
  },
});
