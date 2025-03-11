import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { common_styles } from '../../constant';

const FloatingLabelInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the label when the input is focused or has a value
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = [common_styles.medium_text_normal_weight,{
    position: 'absolute',
    left: 10,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [13, -10], // Moves the label up to the border
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 14], // Shrinks the font size
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'], // Changes label color
    }),
    backgroundColor: '#fff', // Background to cover the border
    paddingHorizontal: 5, // Padding to make the label look better
    zIndex: 1, // Ensure the label is above the border

  }];

  return (
      <View style={[styles.container, isFocused && styles.focusedContainer]}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => setValue(text)}
          value={value}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    position: 'relative',
  },
  focusedContainer: {
    borderColor: '#000', // Change border color when focused
  },
  input: {
  },
});

export default FloatingLabelInput;