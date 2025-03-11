import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Status from '../../../components/Status'
import Header from '../../../components/Header'
import { colorTheme } from '../../../constant'
import BigButton from '../../../components/Buttons/BigButton'
import { ScrollView } from 'react-native-gesture-handler'

export default function Template() {
  return (
    <View style={styles.container}>
      <Status />
      <Header />
      <View style={{flex:1,justifyContent:'space-between'}}>
        <ScrollView contentContainerStyle={[styles.subContainer, {}]} showsVerticalScrollIndicator={false}>
         
        </ScrollView>
        <BigButton
          label={'Continue'}
          style={[styles.subContainer, { bottom: 20, backgroundColor: colorTheme.primaryColor, }]}
          labelStyle={{ color: 'white' }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colorTheme.lightappBackGroundColor,
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
})