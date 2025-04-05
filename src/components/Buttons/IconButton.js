import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colorTheme } from '../../constant';

export default function IconButton({ iconName, size, color, style, IconCategory, onPress, label }) {
    function handlePress() {
        if (onPress) {
            onPress();
            return;
        }
    }
    return (
            <TouchableOpacity onPress={handlePress} style={{
                backgroundColor: colorTheme.iconBg, borderRadius: 50, padding: 5, elevation: 3, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 5, ...style
            }}>
                <IconCategory name={iconName} color={color} size={size} />
                {label && <Text>{label}</Text>}
            </TouchableOpacity>
    )
}
