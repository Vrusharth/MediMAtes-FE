import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import NormalTextInputWithIcon from '../../components/Inputs/NormalTextInputWithIcon';
import IconButton from '../../components/Buttons/IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { colorTheme, common_styles } from '../../constant';

const ArrayInput = ({ label, values, onAdd, onRemove, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  // Function to handle adding a new item to the array
  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      onAdd(inputValue.trim()); // Notify the parent component to add the item
      setInputValue(''); // Clear the input field
    }
  };

  return (
    <View>
      <Text style={[common_styles.large_text_large_weight, { marginBottom: 3 }]}>{label}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {/* Input field */}
        <NormalTextInputWithIcon
          value={inputValue}
          style={{ width: '85%' }}
          placeholder={placeholder}
          onChangeFunc={(text) => setInputValue(text)}
        />
        {/* Add button */}
        <IconButton
          onPress={handleAdd}
          IconCategory={MaterialCommunityIcons}
          iconName={'plus'}
          size={20}
          color={'white'}
          style={{
            backgroundColor: colorTheme.primaryColor,
            padding: 10,
            alignSelf: 'center',
            borderRadius: 30,
          }}
        />
      </View>
      {/* Display the list of items */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', gap: 10, marginBlock: 10 }}>
          {values.map((item, index) => (
            <View
              key={index}
              style={{
                borderWidth: 1,
                borderColor: colorTheme.borderColor,
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text>{item}</Text>
              {/* Delete button */}
              <IconButton
                onPress={() => onRemove(item)}
                IconCategory={Fontisto}
                color={colorTheme.accentColor}
                size={15}
                iconName={'close'}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ArrayInput;