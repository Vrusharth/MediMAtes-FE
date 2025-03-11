import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { colorTheme, common_styles } from '../../../constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../../components/Header';
import CountryInput from '../../../components/Inputs/CountryInput';
import BigButton from '../../../components/Buttons/BigButton';
import { countriesDropDownData } from '../../../assets/Data/DropDownData';
export default function ResetPassword() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header />
      <ScrollView style={styles.subContainer} contentContainerStyle={false}>
        <View style={{ marginTop: 20 }}>
          <Text style={[common_styles.large_text_large_weight]}>Reset Password</Text>
          <Text style={[common_styles.medium_text_normal_weight, { marginTop: 20 }]}>Please enter the phone number associated with your account, and we will send you instructions to reset your password.</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={[common_styles.medium_text_normal_weight, { marginTop: 5 }]}>Mobile Number</Text>
          <View style={{ marginTop: 10 }}>
            <CountryInput data={countriesDropDownData} />
            <View style={{ marginTop: 20 }}>
              <BigButton
                label={'Continue'}
                style={{ backgroundColor: colorTheme.primaryColor }}
                labelStyle={[{ color: 'white' }]}
              />
            </View>
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
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  allText: {
    fontFamily: colorTheme.appcommonfont,
  },
  subText: {
    fontSize: 15,
  },
});