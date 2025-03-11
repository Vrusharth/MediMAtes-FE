import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colorTheme, common_styles } from '../../../../constant';
import NormalTextInputWithIcon from '../../../../components/Inputs/NormalTextInputWithIcon';
import IconButton from '../../../../components/Buttons/IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { validateEmtyInput } from '../../../../utils/validateRegex';
import NormalDropDown from '../../../../components/DropDown/NormalDropDown';
import { degreeTypeDropDownData, doctorDegreeDropDownData, specializationDropDownData } from '../../../../assets/Data/DropDownData';
import DateTimeInput from '../../../../components/Inputs/DateTimeInput';

const CompleteDoctorProfilePage3 = ({ formValues, setFormValues, addNewQualification, updateQualification, deleteQualification }) => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={[common_styles.extra_large_text_large_weight, styles.subContainer, { marginTop: 10, fontSize: 30 }]}>
                Education Details
            </Text>
            <ScrollView contentContainerStyle={[styles.subContainer, { paddingBottom: 10 }]} showsVerticalScrollIndicator={true}>
                {formValues.education_qualifications.map((qualification, index) => (
                    <View key={index} style={{ marginTop: 20 }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={[common_styles.large_text_normal_weight, { marginBottom: 5 }]}>
                                Qualification {index + 1}
                            </Text>
                            <IconButton
                                onPress={() => deleteQualification(index)}
                                IconCategory={MaterialCommunityIcons}
                                color={colorTheme.accentColor}
                                size={20}
                                iconName={'delete'}
                            />
                        </View>
                        <View style={{ gap: 5 }}>
                            <View>
                                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3, }]}>Institute Name</Text>
                                <NormalTextInputWithIcon
                                    placeholder={'Institute Name'}
                                    validationFunc={validateEmtyInput}
                                    value={qualification.institute_name}
                                    onChangeFunc={(text) => updateQualification(index, 'institute_name', text)}
                                />
                            </View>
                            <View>
                                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3, }]}>Address</Text>
                                <NormalTextInputWithIcon
                                    placeholder={'Address'}
                                    validationFunc={validateEmtyInput}
                                    value={qualification.address}
                                    onChangeFunc={(text) => updateQualification(index, 'address', text)}
                                />
                            </View>
                            <View>
                                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Degree Name</Text>
                                <NormalDropDown data={doctorDegreeDropDownData} placeholder={'Degree Name'} onChange={(text) => updateQualification(index, 'degreename', text.value)} />
                            </View>
                            <View>
                                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Specialization</Text>
                                <NormalDropDown data={specializationDropDownData} placeholder={'Specialization'} onChange={(text) => updateQualification(index, 'specialization', text.value)} />
                            </View>
                            <View>
                                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Degree Type</Text>
                                <NormalDropDown data={degreeTypeDropDownData} placeholder={'Degree Type'} onChange={(text) => updateQualification(index, 'degreetype', text.value)} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3, }]}>From Date</Text>
                                    <DateTimeInput mode="date" onChangeValue={(val) => updateQualification(index, 'fromdate', new Date(val).toISOString().split("T")[0])} />
                                </View>
                                <View>
                                    <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3, }]}>To Date</Text>
                                    <DateTimeInput mode="date" onChangeValue={(val) => updateQualification(index, 'todate', new Date(val).toISOString().split("T")[0])} />
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
                <TouchableOpacity onPress={addNewQualification} style={styles.addButton}>
                    <IconButton
                        IconCategory={MaterialCommunityIcons}
                        color={colorTheme.primaryColor}
                        size={30}
                        iconName={'plus'}
                    />
                    <Text style={[common_styles.medium_text_normal_weight, { color: colorTheme.primaryColor }]}>
                        Add Another Qualification
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

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
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: colorTheme.primaryColor,
        borderRadius: 10,
    },
});

export default CompleteDoctorProfilePage3;