import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { colorTheme, common_styles } from '../../constant';
import { useNavigation } from '@react-navigation/native';

// BigButton component
const BigButton = ({ onPress, IconCategory, iconName, label, style, navigateTo, labelStyle, disabled, isPending, iconColor,iconSize }) => {

  const navigation = useNavigation();

  function handleClick() {
    if (!disabled) {  // Only allow navigation when isPending is false
      if (navigateTo) {
        navigation.navigate(navigateTo);
      }
      if (onPress) {
        onPress();
      }
    }
  }

  return (
    <TouchableOpacity onPress={handleClick} style={[styles.button, style, disabled ? { backgroundColor: 'gray' } : null]}>
      {IconCategory &&
        <View style={styles.iconContainer}>
          <IconCategory name={iconName} color={iconColor || colorTheme.accentColor} size={iconSize || 30} />
        </View>
      }
      <Text style={[common_styles.medium_text_normal_weight, labelStyle]}>
        {/* { !isPending && label} */}
        {isPending ? <ActivityIndicator color={'white'} size={25} /> : label}
      </Text>
    </TouchableOpacity>
  );
};

// Styles for the BigButton
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    // width: '100%', // Adjust as needed for full-width button
    justifyContent: 'center',
    gap:10
  },
  iconContainer: {
    // marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: colorTheme.textPrimary, // You can customize text color here
  },
});

export default BigButton;
