import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Underline({ color, style }) {
    return (
        <View style={{ backgroundColor: color || 'black', marginBlock: 15, padding: 0.15, ...style }} />
    )
}

const styles = StyleSheet.create({})