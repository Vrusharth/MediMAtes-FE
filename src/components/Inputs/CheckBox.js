import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorTheme, common_styles } from "../../constant";
import { navigate } from "../../utils/navRef";

const CheckBox = ({ isChecked, onPress, title, style, titleStyle, navigateTitle }) => {

    const iconName = isChecked ? "checkbox-marked" : "checkbox-blank-outline";

    function handleNavigate(params) {
        if (navigateTitle) {
            navigate(navigateTitle)
        }
    }

    return (
        <View style={[styles.container, style]}>
            <Pressable onPress={onPress}>
                <MaterialCommunityIcons name={iconName} size={24} color={colorTheme.textColor} />
            </Pressable>
            {title && <Text onPress={handleNavigate} style={[common_styles.large_text_normal_weight, styles.title, titleStyle]}>{title}</Text>}
        </View>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        // marginTop: 5,
        // marginHorizontal: 5,
    },
    title: {
        fontSize: 16,
        marginLeft: 5,
    },
    iconColor: {
        color: '#000',
    }
});
