import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { colorTheme } from '../../constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LottieView from 'lottie-react-native';
import Status from '../../components/Status';

export default function Success({ route, navigation }) {
  const confettiRef = useRef(null);

  const { role } = route.params;

  useEffect(() => {
    triggerConfetti();
    setTimeout(async () => {
      role === 'patient' ? navigation.navigate('DoctorNavigator') : navigation.navigate('DoctorNavigator');
    }, 4000);
  }, [])


  function triggerConfetti() {
    confettiRef.current.play(0);
  }

  return (
    <View style={styles.container}>
      <Status />
      <View style={styles.subContainer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.successIconContainer}>
            <MaterialCommunityIcons name={'check-bold'} size={40} color={'white'} />
          </View>
          <Text style={styles.congratsText}>Congrates</Text>
          <Text style={styles.messageText}>You have signed up successfully. Go to home & start exploring</Text>
        </View>
        <LottieView
          ref={confettiRef}
          source={require('../../assets/lottie/success.json')}
          autoPlay={false}
          loop={false}
          style={styles.lottie}
          resizeMode='cover'
        />
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
    flex: 1,
    alignSelf: 'center',
  },
  allText: {
    fontFamily: colorTheme.appcommonfont,
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // zIndex: -1,
    pointerEvents: 'none',
  },
  successIconContainer: {
    backgroundColor: "#27AE60",
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  congratsText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  messageText: {
    textAlign: 'center',
  },
});