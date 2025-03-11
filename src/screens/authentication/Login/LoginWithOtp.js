import { StyleSheet, Text, View, StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { colorTheme, common_styles } from '../../../constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../../components/Header';
import BigButton from '../../../components/Buttons/BigButton';
import { countriesDropDownData } from '../../../assets/Data/DropDownData';
import CountryInput from '../../../components/Inputs/CountryInput';
import Status from '../../../components/Status';

export default function LoginWithOTP() {
    return (
        <View style={styles.container}>
            <Status />
            <Header />
            <View style={styles.subContainer}>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Text style={[common_styles.large_text_large_weight,]}>Login with OTP</Text>
                    <View style={{ marginTop: 30 }}>
                        <Text style={[common_styles.medium_text_normal_weight,  { marginBlock: 5 }]}>Mobile Number</Text>
                        <View style={{ gap: 20 }}>
                            <CountryInput data={countriesDropDownData} />
                            <View style={{ gap: 10 }}>
                                <BigButton
                                    label={'Continue'}
                                    style={{ backgroundColor: colorTheme.primaryColor }}
                                    labelStyle={[{ color: 'white' }]}
                                    navigateTo={'VerificationCode'}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                        <Text style={styles.subText}>Don't have an account?</Text>
                        <Text style={[styles.linkText, { marginLeft: 5, color: colorTheme.primaryColor }]}>Register</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30, alignItems: 'center', }}>
                        <View style={styles.divider} />
                        <Text style={[styles.subText, { marginHorizontal: 10 }]}>OR</Text>
                        <View style={styles.divider} />
                    </View>
                    <View style={{ marginTop: 30, gap: 10 }}>
                        <BigButton
                            IconCategory={MaterialCommunityIcons}
                            iconName={'google'}
                            label={'Continue with Google'}
                            style={{ backgroundColor: '#f5f5fa' }}
                        />
                        <BigButton
                            IconCategory={MaterialCommunityIcons}
                            iconName={'facebook'}
                            label={'Continue with FaceBook'}
                            style={{ backgroundColor: '#f5f5fa' }}
                        />
                    </View>
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
        flex: 1,
    },
    allText: {
        fontFamily: colorTheme.appcommonfont,
    },
    subText: {
        fontSize: 16,
    },
    divider: {
        borderWidth: 0.5,
        width: '45%',
        height: 1,
        borderColor: colorTheme.borderColor,
    },
});