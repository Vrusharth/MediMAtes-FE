import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorTheme } from '../constant'

export default function Underline({ color, style }) {
    return (
        <View style={{ backgroundColor: color || colorTheme.borderColor, marginBlock: 10, padding: 0.15, ...style }} />
    )
}

const styles = StyleSheet.create({})