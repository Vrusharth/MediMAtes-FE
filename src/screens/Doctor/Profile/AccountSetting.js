import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Status from '../../../components/Status'
import Header from '../../../components/Header'
import { colorTheme, common_styles } from '../../../constant'
import BigButton from '../../../components/Buttons/BigButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FloatingLabel from '../../../components/Inputs/FloatingLabel'

export default function AccountSetting() {
  return (
    <View style={styles.container}>
      <Status />
      <Header title={'Account Settings'} />
      <View style={styles.subContainer}>
        <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between' }}>
          <Image
            source={require('../../../assets/img/try.jpg')}
            style={{
              width: 55,
              height: 55,
              objectFit: 'cover',
              borderRadius: 50,
            }}
          />
          <BigButton
            iconSize={25}
            iconName={'camera-outline'}
            IconCategory={MaterialCommunityIcons}
            label={'Change Profile Picture'}
            iconColor={'black'}
            style={{ borderWidth: 1, }}
          />
        </View>
        <View style={{ marginBlock: 20, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colorTheme.iconWithBlueBackGround, padding: 10, borderRadius: 10, }}>
          <MaterialIcons color={colorTheme.iconLightBackGroundColor} size={20} name={"verified"} />
          <Text style={[common_styles.medium_text_normal_weight]}>You Passed the KYC test</Text>
        </View>
        <View>
          <FloatingLabel label={"Name"} />
          <FloatingLabel label={"Email"} />
        </View>
      </View>
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
    marginTop: 20
  },
})