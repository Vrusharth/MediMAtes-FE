import {  StatusBar } from 'react-native'
import React from 'react'

export default function Status() {
    return (
        <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
            // hidden
        />
    )
}