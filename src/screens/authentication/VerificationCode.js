import { StyleSheet, Text, View, StatusBar, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Status from '../../components/Status';
import { colorTheme } from '../../constant';
import BigButton from '../../components/Inputs/BigButton';
import { useRoute } from '@react-navigation/native';
import { useVerifyOtp } from '../../Hooks/auth';
import FailAlert from '../../components/Alert/FailAlert';


export default function VerificationCode() {
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const route = useRoute();

    const { email, password } = route.params;

    const { mutate, isPending, isError, error } = useVerifyOtp();

    function handleClick(params) {
        mutate({ email, password, otp: value });
    }

    return (
        <View style={styles.container}>
            <Status />
            <Header />
            {isError && <FailAlert isError={isError} error={error?.response?.data?.error} />}
            <ScrollView style={styles.subContainer}>
                <Text style={[styles.titleText, { marginTop: 20 }]}>Enter verification code</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.subText}>Enter the verification code sent to</Text>
                    <Text style={[styles.linkText, { marginLeft: 5 }]}>(7718822353)</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                        testID="my-code-input"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                    <View style={{ marginTop: 20 }}>
                        <BigButton
                            label={'Continue'}
                            style={{ backgroundColor: colorTheme.primaryColor }}
                            labelStyle={[{ color: 'white' }]}
                            disabled={value.length !== 6}
                            onPress={handleClick}
                            isPending={isPending}
                            isError={isError}  // Pass the isError prop here
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                        <Text style={styles.subText}>Didn't receive the code?</Text>
                        <Text style={[styles.linkText, { marginLeft: 5 }]}>Resend</Text>
                        <Text style={[styles.subText, { marginLeft: 5 }]}>in 30 seconds </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
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
    codeFieldRoot: { marginTop: 0, },
    cell: {
        width: 45,
        height: 45,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: colorTheme.borderColor,
        textAlign: 'center',
        borderRadius: 10
    },
    focusCell: {
        borderColor: '#000',
    },
});