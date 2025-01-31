import { StyleSheet, Text, View, StatusBar, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import { colorTheme, common_styles } from '../../../constant';
import Header from '../../../components/Header';
import NormalTextInputWithIcon from '../../../components/Inputs/NormalTextInputWithIcon';
import BigButton from '../../../components/Inputs/BigButton';
import Status from '../../../components/Status';

export default function SetPassword() {

    return (
        <View style={styles.container}>
            <Status />
            <Header />
            <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
                <Text style={[common_styles.large_text_large_weight, { marginTop: 20 }]}>Set new password</Text>
                <View style={{ marginVertical: 10, marginTop: 50 }}>
                    <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5 }]}>New Password</Text>
                    <NormalTextInputWithIcon icon={'lock'} secureTextEntry={true} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5 }]}>Confirm Password</Text>
                    <NormalTextInputWithIcon icon={'lock'} secureTextEntry={true} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <BigButton
                        label={'Reset Password'}
                        style={{ backgroundColor: colorTheme.primaryColor }}
                        labelStyle={[{ color: 'white' }]}
                    />
                </View>
            </ScrollView>
        </View>
    )
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
    allText: {
        fontFamily: colorTheme.appcommonfont,
    },
    subText: {
        fontSize: 16,
    },
});
