import { TouchableOpacity } from 'react-native'
import React from 'react'

export default function IconButton({ iconName, size, color, style, IconCategory, onPress }) {
    function handlePress() {
        if (onPress) {
            onPress();
            return;
        }
    }
    return (
        <TouchableOpacity onPress={handlePress} style={{ ...style }}>
            <IconCategory name={iconName} color={color} size={size} />
        </TouchableOpacity>
    )
}
