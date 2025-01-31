import { StyleSheet, Text, View, useColorScheme, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../../components/Header';
import NormalTextInputWithIcon from '../../../components/Inputs/NormalTextInputWithIcon';
import Status from '../../../components/Status';
import { colorTheme, common_styles } from '../../../constant';
import BigButton from '../../../components/Inputs/BigButton';
import { navigate } from '../../../utils/navRef';
import { validateEmail, validatePassword } from '../../../utils/validateRegex';
import { useLogin } from '../../../Hooks/auth';
import FailAlert from '../../../components/Alert/FailAlert';

export default function LoginWithEmail() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })

    const { mutate, isPending, isError, error } = useLogin();

    const isDisabled = !formValues.email || !formValues.password || validateEmail(formValues.email) !== '' ||
        validatePassword(formValues.password) !== '';

    function handleClick(params) {
        mutate({ email: formValues.email, password: formValues.password });
    }

    return (
        <View style={styles.container}>
            <Status />
            <Header />
            {isError && <FailAlert isError={isError} error={error?.response?.data?.error} />}
            <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Text style={[common_styles.large_text_large_weight,]}>Login with Email</Text>
                    <View style={{ marginTop: 30 }}>
                        <View>
                            <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5 }]}>Email</Text>
                            <NormalTextInputWithIcon validationFunc={validateEmail} setFormValues={setFormValues} value={formValues.email} name={'email'} placeholder={'example@gmail.com'} icon={'email'} />
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5 }]}>Password</Text>
                            <NormalTextInputWithIcon validationFunc={validatePassword} setFormValues={setFormValues} value={formValues.password} name={'password'} icon={'lock'} secureTextEntry={true} />
                        </View>
                        <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[common_styles.medium_text_normal_weight, { color: colorTheme.primaryColor }]}>Forgot Password?</Text>
                        </View>
                        <View style={{ gap: 10 }}>
                            <BigButton
                                label={'Continue'}
                                style={{ backgroundColor: colorTheme.primaryColor }}
                                labelStyle={[{ color: 'white' }]}
                                disabled={isDisabled}
                                onPress={handleClick}
                                isPending={isPending}
                            />
                            <BigButton
                                label={'Login with Phone'}
                                style={{ backgroundColor: colorTheme.primaryColor }}
                                labelStyle={{ color: 'white' }}
                                navigateTo={'LoginWithOTP'}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30,alignItems:'center',gap:5 }}>
                        <Text style={common_styles.medium_text_normal_weight}>Don't have an account?</Text>
                        <Text onPress={() => navigate('SignUpNavigator')} style={[common_styles.medium_text_normal_weight, { color: colorTheme.primaryColor }]}>Register</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30, alignItems: 'center', }}>
                        <View style={styles.divider} />
                        <Text style={[common_styles.medium_text_normal_weight, { marginHorizontal: 10 }]}>OR</Text>
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