import { StyleSheet, Text, View, ScrollView } from 'react-native';
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

export default function NameEmail() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirm_password: '',
        term_condition: false
    })

    const { mutate, isPending, isError, error } = useSignUp('VerificationCode',{ email: formValues.email, password: formValues.password });

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
            {isError && <FailAlert error={error?.response?.data?.error} />}
            <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
                <Text style={[styles.titleText, { marginTop: 20 }]}>Set Credentials</Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.subText, { marginBottom: 10, }]}>Email</Text>
                    <NormalTextInputWithIcon placeholder={'example@gmail.com'} validationFunc={validateEmail} setFormValues={setFormValues} value={formValues.email} name={'email'} icon={'email'} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.subText, { marginBottom: 10, }]}>Password</Text>
                    <NormalTextInputWithIcon validationFunc={validatePassword} secureTextEntry={true} setFormValues={setFormValues} value={formValues.password} name={'password'} icon={'lock'} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.subText, { marginBottom: 10, }]}>Confirm Password</Text>
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