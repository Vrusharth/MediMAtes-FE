import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Status from '../../../components/Status'
import Header from '../../../components/Header'
import { colorTheme, common_styles } from '../../../constant'
import BigButton from '../../../components/Buttons/BigButton'
import Divider from '../../../components/Divider'
import { TremAndCOnditionData } from '../../../assets/Data/TremAndConditionData'

function TermText({ data }) {
  return (
    <View>
      <View style={[styles.subContainer, { padding: 5 }]}>
        <Text style={[common_styles.small_text_large_weight]}>
          {data.term}
        </Text>
        <Text style={[common_styles.small_text_normal_weight, { fontSize: 13 }]}>
          {data.condition}
        </Text>
      </View>
      <Divider marginBlock={6} />
    </View>
  )
}

export default function TermAndCondition() {
  return (
    <View style={styles.container}>
      <Status />
      <Header title={"App Permissions"} />
      <View style={[styles.subContainer, { backgroundColor: '#b1f5a6', borderRadius: 5, padding: 5, marginTop: 10 }]}>
        <Text style={[common_styles.small_text_large_weight, { color: '#1a660d' }]}>
          Prominent Disclosure & User Consent
        </Text>
        <Text style={[common_styles.small_text_normal_weight, { color: '#1a660d', fontSize: 13 }]}>
          MediMates app needs certain permissions to provide health services like connecting you with our expert doctors, providing lab/diagnostic services, and providing you with medicine delivery. Below permissions help us to serve you better.
        </Text>
      </View>
      <Divider marginBlock={10} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {TremAndCOnditionData.map((data, index) => (
          <TermText key={index} data={data} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: colorTheme.lightappBackGroundColor
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  divider: {
    borderWidth: 0.5,
    width: '45%',
    height: 1,
    borderColor: colorTheme.borderColor,
  },
});

