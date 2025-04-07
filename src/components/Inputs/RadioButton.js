import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { common_styles } from '../../constant';

const RadioButton = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
            <View style={[styles.radioCircle, selected && styles.selected]}>
                {selected && <View style={styles.innerCircle} />}
            </View>
            {label && <Text style={[common_styles.small_text_normal_weight]}>{label}</Text>}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap:5
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        borderColor: '#007AFF',
    },
    innerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
    },
})
export default RadioButton;
