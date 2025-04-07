import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BigButton from '../Buttons/BigButton'
import { useNavigation } from '@react-navigation/native'
import { colorTheme, common_styles } from '../../constant'
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconButton from '../Buttons/IconButton'
import Underline from '../Underline'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function UpcomingAppointmentCard({ item,style }) {
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: colorTheme.primaryColor, padding: 10, borderRadius: 15, width: '100%',...style }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={require('../../assets/img/man.png')} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 50 }} />
                    <View>
                        <Text style={[common_styles.large_text_large_weight, { color: 'white' }]}>{item.doctor}</Text>
                        <Text style={[common_styles.small_text_normal_weight, { color: 'white' }]}>{item.specialty}</Text>
                    </View>
                </View>
                <IconButton onPress={() => { }} IconCategory={Ionicons} color={"white"} iconName={'videocam-outline'} size={35} />
            </View>

            <Underline color={'white'} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <View>
                        <IconButton IconCategory={MaterialIcons} color={colorTheme.primaryColor} style={{}} iconName={'date-range'} size={20} />
                    </View>
                    <View>
                        <Text style={[common_styles.small_text_small_weight, { color: 'white' }]}>Date</Text>
                        <Text style={[common_styles.small_text_normal_weight, { color: 'white' }]}>{item.date}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <View>
                        <IconButton IconCategory={MaterialIcons} color={colorTheme.primaryColor} style={{}} iconName={'timer'} size={20} />
                    </View>
                    <View>
                        <Text style={[common_styles.small_text_small_weight, { color: 'white' }]}>Time</Text>
                        <Text style={[common_styles.small_text_normal_weight, { color: 'white' }]}>{item.time}</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginBlock: 15, justifyContent: 'space-between', flexDirection: 'row' }}>
                <BigButton onPress={() => navigation.navigate('AppointmentDetail')} label={"Re-Schedule"} style={{ backgroundColor: 'white', width: '45%', borderRadius: 30, elevation: 10 }} />
                <BigButton label={"View Profile"} labelStyle={{ color: 'white' }} style={{ backgroundColor: colorTheme.primaryColor, elevation: 10, width: '45%', borderRadius: 30 }} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({})