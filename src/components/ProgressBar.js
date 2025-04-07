import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorTheme } from '../constant';

const ProgressBar = ({ progress,width,style }) => {
  return (
    <View style={[styles.container,{width:width || "90%",...style}]}>
      <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colorTheme.primaryColor,
    borderRadius: 5,
  },
});

export default ProgressBar;