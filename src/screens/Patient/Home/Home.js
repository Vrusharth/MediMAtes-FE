import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Status from '../../../components/Status'
import BigButton from '../../../components/Buttons/BigButton'
import { colorTheme, common_styles } from '../../../constant'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconButton from '../../../components/Buttons/IconButton'
import { useNavigation } from '@react-navigation/native'
import StackedCarousel from '../../../components/Carousel/StackedCarousel'
import Underline from '../../../components/Underline'
import UpcomingAppointmentCard from '../../../components/Card/UpcomingAppointmentCard'

export default function Home() {
  const navigation = useNavigation();

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Ali Khan',
      specialty: 'Cardiology',
      date: '18 Nov, Monday',
      time: '5pm - 8:30pm',
    },
    {
      id: 2,
      doctor: 'Dr. Jane Smith',
      specialty: 'Dermatology',
      date: '20 Nov, Wednesday',
      time: '10am - 11am',
    },
    {
      id: 3,
      doctor: 'Dr. John Doe',
      specialty: 'Orthopedics',
      date: '22 Nov, Friday',
      time: '3pm - 4pm',
    },
    {
      id: 4,
      doctor: 'Dr. John2 Doe',
      specialty: 'Orthopedics2',
      date: '22 Nov, Friday',
      time: '3pm - 4pm',
    },
    {
      id: 5,
      doctor: 'Dr. John3 Doe',
      specialty: 'Orthopedics3',
      date: '22 Nov, Friday',
      time: '3pm - 4pm',
    },
  ];

  return (
    <View style={styles.container}>
      <Status />
      <View style={{ flex: 1, }}>
        <ScrollView contentContainerStyle={[styles.subContainer, {}]} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Pressable onPress={() => navigation.openDrawer()}>
                <Image source={require('../../../assets/img/man.png')} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 50 }} />
              </Pressable>
              <View>
                <Text style={[common_styles.small_text_normal_weight]}>Good Morning!</Text>
                <Text style={[common_styles.large_text_normal_weight]}>Sharvesh Singh</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
              <IconButton IconCategory={MaterialIcons} color={colorTheme.primaryColor} iconName={'videocam'} size={25} />
              <IconButton onPress={() => navigation.navigate("Chat")} IconCategory={MaterialIcons} color={colorTheme.primaryColor} iconName={'wechat'} size={25} />
            </View>
          </View>
          <View style={{ marginBlock: 20 }}>
            <Text style={[common_styles.extra_large_text_large_weight, { fontSize: 30 }]}>How are you feeling today?</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <BigButton
              IconCategory={Ionicons}
              iconName={'search-sharp'}
              iconColor={'black'}
              iconSize={20}
              style={{ backgroundColor: colorTheme.iconBg, borderRadius: 15, width: '85%', justifyContent: '' }}
              label={"Search a doctor ..."}
              onPress={()=>{navigation.navigate('Search')}}
            />
            <IconButton  IconCategory={Ionicons} color={colorTheme.primaryColor} iconName={'mic'} size={30} style={{ borderRadius: 10 }} />
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
              <Text style={[common_styles.large_text_normal_weight]}>Upcoming Appointments</Text>
              <Text style={[common_styles.small_text_normal_weight, { color: colorTheme.primaryColor }]}>View All</Text>
            </View>
            <StackedCarousel items={appointments} renderItem={renderItem} />

          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const renderItem = (item) => {
  const navigation = useNavigation();
  return (
    <UpcomingAppointmentCard item={item} />
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: colorTheme.lightappBackGroundColor,
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
})