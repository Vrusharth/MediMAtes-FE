import { View } from 'react-native'
import React from 'react'
import { colorTheme } from '../constant'

export default function Divider({ thickNess, marginBlock }) {
  return (
    <View style={{ backgroundColor: colorTheme.borderColor, height: thickNess || 1, marginBlock: marginBlock || 5 }} />

  )
}