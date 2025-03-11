import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { common_styles } from '../constant';

export default function Header({ title, selfNavigate }) {
    const navigation = useNavigation();

    function handlePress() {
        if (selfNavigate) {
            selfNavigate();
            return;
        }
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={'chevron-left'} size={30} onPress={handlePress} />
            <Text style={common_styles.large_text_large_weight}>{title ? title : 'Back'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
});