import {  StatusBar } from 'react-native'
import React from 'react'

export default function Status() {
    return (
        <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
        />
    )
}