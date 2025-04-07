import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Status from '../../../components/Status'
import Header from '../../../components/Header'
import { colorTheme, common_styles } from '../../../constant'
import BigButton from '../../../components/Buttons/BigButton'
import { ScrollView } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconButton from '../../../components/Buttons/IconButton'
import NormalTextInputWithIcon from '../../../components/Inputs/NormalTextInputWithIcon'
import Underline from '../../../components/Underline'

export default function AppointmentDetail() {
    return (
        <View style={styles.container}>
            <Status />
            <Header title={'Review & Pay'} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView contentContainerStyle={[styles.subContainer, { paddingBottom: 30 }]} showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 200, position: 'relative' }}>
                            <Image source={require('../../../assets/img/man.png')} style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 200, margin: 2 }} />
                            <View style={{ borderRadius: '50%', position: 'absolute', zIndex: 1, bottom: 15, right: 0, backgroundColor: 'white' }}>
                                <View style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'green', margin: 5 }} />
                            </View>
                        </View>
                        <Text style={[common_styles.extra_large_text_large_weight,]}>Dr Sharvesh Singh</Text>
                        <Text style={[common_styles.medium_text_normal_weight, { color: 'gray' }]}>Cardiologist</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[common_styles.large_text_large_weight, { color: 'gray' }]}>Appointment</Text>
                        <View style={{ marginTop: 10, padding: 10, elevation: 5, backgroundColor: 'white', borderRadius: 5 }}>
                            <Text style={[common_styles.large_text_large_weight,]}>Patient Info</Text>
                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                                <Image source={require('../../../assets/img/man.png')} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 200, margin: 2 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={[common_styles.small_text_normal_weight]}>
                                        <Text style={{ color: 'red', }}>Note: </Text>
                                        You can submit test report, old prescription and test report and below drop link
                                    </Text>
                                </View>
                            </View>
                            <BigButton
                                label={"Click to upload prescription"}
                                style={{ borderWidth: 1, marginTop: 15, borderStyle: 'dashed' }}
                                IconCategory={MaterialCommunityIcons}
                                iconName={'cloud-upload-outline'}
                                iconSize={20}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={[common_styles.large_text_large_weight, { color: 'gray' }]}>Schedule</Text>
                        <View style={{ marginTop: 10, padding: 10, elevation: 5, backgroundColor: 'white', borderRadius: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={[common_styles.large_text_large_weight,]}>Time & Date</Text>
                                <IconButton
                                    IconCategory={MaterialCommunityIcons}
                                    iconName={'pencil'}
                                    size={20}
                                    style={{ backgroundColor: colorTheme.iconBg }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <IconButton
                                    IconCategory={MaterialCommunityIcons}
                                    iconName={'clock'}
                                    size={20}
                                    label={'07:00 PM'}
                                />
                                <IconButton
                                    IconCategory={MaterialCommunityIcons}
                                    iconName={'calendar-month'}
                                    size={20}
                                    label={'17 Feb, 2025'}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={[common_styles.large_text_large_weight, { color: 'gray' }]}>Payment</Text>
                        <View style={{ marginTop: 10, padding: 10, elevation: 5, backgroundColor: 'white', borderRadius: 5 }}>
                            <Text style={[common_styles.large_text_large_weight,]}>Promo Code</Text>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <NormalTextInputWithIcon
                                    placeholder={'Promo Code'}
                                    style={{ width: '65%', borderWidth: 0, backgroundColor: colorTheme.iconBg }}
                                    inputMode={'numeric'}
                                />
                                <BigButton
                                    label={'Apply'}
                                    style={[{ backgroundColor: colorTheme.primaryColor, borderRadius: 30, paddingInline: 25 }]}
                                    labelStyle={{ color: 'white' }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, padding: 10, elevation: 5, backgroundColor: 'white', borderRadius: 5 }}>
                            <Text style={[common_styles.large_text_large_weight,]}>Bill Details</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={[common_styles.small_text_normal_weight, { color: 'gray' }]}>Consultion Fees</Text>
                                <Text style={[common_styles.small_text_large_weight,]}>₹100</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={[common_styles.small_text_normal_weight, { color: 'gray' }]}>Booking Fee</Text>
                                <Text style={[common_styles.small_text_large_weight,]}>₹100</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={[common_styles.small_text_normal_weight, { color: 'gray' }]}>Promo Aplied</Text>
                                <Text style={[common_styles.small_text_large_weight,]}>₹100</Text>
                            </View>
                            <Underline style={{ padding: 1 }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={[common_styles.medium_text_large_weight, ]}>Total Pay</Text>
                                <Text style={[common_styles.medium_text_large_weight,]}>₹300</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
                <BigButton
                    label={`Pay ₹${300}`}
                    style={[styles.subContainer, { bottom: 20, backgroundColor: colorTheme.primaryColor, borderRadius: 30 }]}
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