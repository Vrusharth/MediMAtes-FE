import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { common_styles } from '../constant';
import IconButton from './Buttons/IconButton';

export default function Header({ title, selfNavigate, rightIcon }) {
    const navigation = useNavigation();

    function handlePress() {
        if (selfNavigate) {
            selfNavigate();
            return;
        }
        navigation.goBack()
    }
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 30, paddingHorizontal: 10 }}>
            <View style={styles.container}>
                <MaterialCommunityIcons name={'chevron-left'} size={30} onPress={handlePress} />
                <Text style={common_styles.extra_large_text_large_weight}>{title ? title : 'Back'}</Text>
            </View>
            {rightIcon && <IconButton IconCategory={MaterialCommunityIcons} color={'black'} iconName={rightIcon} size={25} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

    },
});