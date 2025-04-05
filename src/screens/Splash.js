import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import Status from '../components/Status';
import { getItem } from '../utils/asyncstorage';

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(async () => {
      const userToken = await getItem('user');
      const role = await getItem('role');
      if (userToken) {
        if (role === 'patient')
          navigation.navigate('PatientStackNavigation')
        else
          navigation.navigate('DoctorNavigator')
      } else {
        navigation.navigate('GetStarted')
      }
    }, 4000);
  }, [])


  return (
    <View style={styles.container}>
      <Status />
      <LottieView
        source={require('../assets/lottie/Splash.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})