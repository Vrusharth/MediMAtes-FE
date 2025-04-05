import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Status from '../../../components/Status'
import Header from '../../../components/Header'
import { colorTheme, common_styles } from '../../../constant'
import BigButton from '../../../components/Buttons/BigButton'
import { truncateText } from '../../../utils/commonFunction'

export default function Chat() {
  return (
    <View style={styles.container}>
      <Status />
      <Header title={"Chat Messages"} />
      <ScrollView contentContainerStyle={[{ marginBlock: 20, }]} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal contentContainerStyle={{gap:20}}>
          {[1, 2, 3, 4, 5].map((data, index) => (
            <View key={index} style={{ marginBlock: 15, alignItems: "center", }}>
              <Image source={require('../../../assets/img/try.jpg')} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 50 }} />
              <Text style={[common_styles.medium_text_normal_weight]}>{truncateText("Vrusharth Nirmal", 10)}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={[styles.subContainer,]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[common_styles.large_text_large_weight]}>Messages</Text>
            <Text style={[common_styles.large_text_large_weight, { color: colorTheme.primaryColor }]}>Requests</Text>
          </View>
        </View>
      </ScrollView>
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