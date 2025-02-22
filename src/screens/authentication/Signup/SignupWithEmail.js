import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colorTheme, common_styles } from '../../../constant';
import Header from '../../../components/Header';
import BigButton from '../../../components/Inputs/BigButton';
import NormalTextInputWithIcon from '../../../components/Inputs/NormalTextInputWithIcon';
import Status from '../../../components/Status';
import CheckBox from '../../../components/Inputs/CheckBox';
import { useSignUp } from '../../../Hooks/auth';
import FailAlert from '../../../components/Alert/FailAlert';
import { validateEmail, validatePassword } from '../../../utils/validateRegex';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SignupWithEmail() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirm_password: '',
        term_condition: false
    })
    const [isDoctor, setisDoctor] = useState(false);

    const { mutate, isPending, isError, error } = useSignUp('VerificationCode', { email: formValues.email, password: formValues.password, isDoctor: isDoctor }, isDoctor);

    function handleCheckBox() {
        setFormValues((prevValues) => ({
            ...prevValues,
            term_condition: !prevValues.term_condition
        }));
    }

    function handleClick(params) {
        const { email, password } = formValues;
        mutate({ email, password });
    }

    const isDisabled = !formValues.email || !formValues.password || !formValues.confirm_password || !formValues.term_condition || formValues.password !== formValues.confirm_password || validateEmail(formValues.email) !== '' ||
        validatePassword(formValues.password) !== '';

    return (
        <View style={styles.container}>
            <Status />
            <Header />
            {isError && <FailAlert error={error?.response?.data?.message} />}
            <ScrollView contentContainerStyle={[styles.subContainer, { paddingBottom: 10 }]} showsVerticalScrollIndicator={false}>
                <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 10 }]}>
                    <TouchableOpacity
                        onPress={() => setisDoctor(false)}
                        style={[!isDoctor && { backgroundColor: colorTheme.primaryColor }, { paddingInline: 30, paddingBlock: 5, borderRadius: 30 }]}>
                        <Text style={[common_styles.large_text_large_weight, { color: !isDoctor ? 'white' : 'black' }]}>Patient</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setisDoctor(true)}
                        style={[isDoctor && { backgroundColor: colorTheme.primaryColor }, { paddingInline: 30, paddingBlock: 5, borderRadius: 30 }]}>
                        <Text style={[common_styles.large_text_large_weight, { color: isDoctor ? 'white' : 'black' }]}>Doctor</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[common_styles.extra_large_text_large_weight, { marginTop: 10 }]}>Set Credentials</Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Email</Text>
                    <NormalTextInputWithIcon placeholder={'example@gmail.com'} validationFunc={validateEmail} setFormValues={setFormValues} value={formValues.email} name={'email'} icon={'email'} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Password</Text>
                    <NormalTextInputWithIcon validationFunc={validatePassword} secureTextEntry={true} setFormValues={setFormValues} value={formValues.password} name={'password'} icon={'lock'} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Confirm Password</Text>
                    <NormalTextInputWithIcon secureTextEntry={true} setFormValues={setFormValues} value={formValues.confirm_password} name={'confirm_password'} icon={'lock'} />
                </View>
                <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox navigateTitle={'TermAndCondition'} titleStyle={{ color: colorTheme.primaryColor }} title={'Terms And Conditions'} isChecked={formValues.term_condition} onPress={handleCheckBox} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <BigButton
                        label={'Continue'}
                        style={{ backgroundColor: colorTheme.primaryColor }}
                        labelStyle={[{ color: 'white' }]}
                        disabled={isDisabled}
                        onPress={handleClick}
                        isPending={isPending}
                    />
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
            </ScrollView>
        </View >
    );
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
    titleText: {
        fontWeight: '500',
        fontSize: 20,
    },
    subText: {
        fontWeight: '400',
        fontSize: 15,
    },
    linkText: {
        fontWeight: '400',
        fontSize: 15,
        color: colorTheme.primaryColor,
    },
    divider: {
        borderWidth: 0.5,
        width: '45%',
        height: 1,
        borderColor: colorTheme.borderColor,
    },
});