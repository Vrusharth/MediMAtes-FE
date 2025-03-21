import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, common_styles } from '../../../../constant';
import NormalTextInputWithIcon from '../../../../components/Inputs/NormalTextInputWithIcon';
import { validateEmtyInput } from '../../../../utils/validateRegex';
import NormalDropDown from '../../../../components/DropDown/NormalDropDown';
import { genderDropDown } from '../../../../assets/Data/DropDownData';

export default function CompletePatientProfilePage3({ formValues, setFormValues }) {
    const [emergencyContact, setemergencyContact] = useState(false);
    function toggleSwitch() {
        setemergencyContact(prev => !prev)
    }

    function updateFormValues(method, key, value) {
        setFormValues((prevValues) => ({
            ...prevValues,
            [method]: {
                ...prevValues[method],
                [key]: value
            },
        }));
    }
    return (
        <View>
            <Text style={[common_styles.extra_large_text_large_weight, { marginTop: 10, fontSize: 25 }]}>Cantact and address</Text>
            <View style={{ marginTop: 20 }}>
                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5, }]}>Contact number</Text>
                <NormalTextInputWithIcon placeholder={'+91 9876543212'} validationFunc={validateEmtyInput} setFormValues={setFormValues} value={formValues.contact_number} name={'contact_number'} />
            </View>

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[common_styles.large_text_large_weight, { marginBlock: 10 }]}>Emergency Contact</Text>
                    <Switch
                        thumbColor={emergencyContact ? 'white' : colorTheme.borderColor}
                        trackColor={{ false: '#767577', true: colorTheme.primaryColor }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={emergencyContact}
                    />
                </View>
                <View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3, }]}>Contact Name</Text>
                        <NormalTextInputWithIcon
                            placeholder={'Enter contact name'}
                            validationFunc={validateEmtyInput}
                            value={formValues.emergency_contact.name}
                            onChangeFunc={(text) => updateFormValues('emergency_contact', 'name', text)}
                            disabled={!emergencyContact}
                        />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3, }]}>Contact Relationship</Text>
                        <NormalDropDown data={genderDropDown}
                            onChange={(text) => updateFormValues('emergency_contact', 'relationship', text.value)} disabled={!emergencyContact} />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3, }]}>Contact Number</Text>
                        <NormalTextInputWithIcon
                            placeholder={'Enter contact number'}
                            validationFunc={validateEmtyInput}
                            inputMode={'numeric'}
                            value={formValues.emergency_contact.phone}
                            onChangeFunc={(text) => updateFormValues('emergency_contact', 'phone', text)}
                            disabled={!emergencyContact}
                        />
                    </View>
                </View>
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={[common_styles.large_text_large_weight, { marginBlock: 10 }]}>Address</Text>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                    <View style={{ width: '45%' }}>
                        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5, }]}>Street</Text>
                        <NormalTextInputWithIcon placeholder={'Street'} validationFunc={validateEmtyInput} onChangeFunc={(text) => updateFormValues('address', 'street', text)} />
                    </View>
                    <View style={{ width: '45%' }}>
                        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5, }]}>City</Text>
                        <NormalTextInputWithIcon placeholder={'City'} validationFunc={validateEmtyInput} onChangeFunc={(text) => updateFormValues('address', 'city', text)} />
                    </View>
                </View>

                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                    <View style={{ width: '45%' }}>
                        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5, }]}>State</Text>
                        <NormalTextInputWithIcon placeholder={'state'} validationFunc={validateEmtyInput} onChangeFunc={(text) => updateFormValues('address', 'state', text)} />
                    </View>
                    <View style={{ width: '45%' }}>
                        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5, }]}>Zip Code</Text>
                        <NormalTextInputWithIcon inputMode={'numeric'} placeholder={'Zip Code'} validationFunc={validateEmtyInput} onChangeFunc={(text) => updateFormValues('address', 'zip_code', text)} />
                    </View>
                </View>

                <View >
                    <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5, }]}>Country</Text>
                    <NormalTextInputWithIcon placeholder={'Country'} validationFunc={validateEmtyInput} onChangeFunc={(text) => updateFormValues('address', 'country', text)} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBlock: 5,
        backgroundColor: colorTheme.lightappBackGroundColor,
    },
    subContainer: {
        width: '90%',
        alignSelf: 'center',
    },
});