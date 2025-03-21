import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorTheme, common_styles } from '../../../../constant'
import { validateEmtyInput } from '../../../../utils/validateRegex';
import NormalTextInputWithIcon from '../../../../components/Inputs/NormalTextInputWithIcon';
import { bloodGroupDropDown, genderDropDown, martialStatusDropDown, nationalityDropDown, occupationStatusDropDown } from '../../../../assets/Data/DropDownData';
import NormalDropDown from '../../../../components/DropDown/NormalDropDown';
import DateTimeInput from '../../../../components/Inputs/DateTimeInput';

export default function CompletePatientProfilePage1({ formValues, setFormValues }) {
  function setDate(name, value) {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }
  return (
    <View>
      <Text style={[common_styles.extra_large_text_large_weight, { marginTop: 10, fontSize: 25 }]}>Name and details</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5, }]}>Full Name</Text>
        <NormalTextInputWithIcon placeholder={'John Doe'} validationFunc={validateEmtyInput} setFormValues={setFormValues} value={formValues.full_name} name={'full_name'} />
      </View>
      <View>
        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Gender</Text>
        <NormalDropDown data={genderDropDown} setFormValues={setFormValues} value={formValues.gender} name={'gender'} />
      </View>
      <View>
        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3, }]}>Date Of Birth</Text>
        <DateTimeInput mode="date" onChangeValue={(val) => setDate('date_of_birth', new Date(val).toISOString().split("T")[0])} />
      </View>
      <View>
        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Martial Status</Text>
        <NormalDropDown data={martialStatusDropDown} setFormValues={setFormValues} value={formValues.marital_status} name={'marital_status'} />
      </View>
      <View>
        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Blood Group</Text>
        <NormalDropDown data={bloodGroupDropDown} setFormValues={setFormValues} value={formValues.blood_group} name={'blood_group'} />
      </View>
      <View>
        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Occupation</Text>
        <NormalDropDown data={occupationStatusDropDown} setFormValues={setFormValues} value={formValues.occupation} name={'occupation'} />
      </View>
      <View>
        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10, }]}>Nationality</Text>
        <NormalDropDown data={nationalityDropDown} setFormValues={setFormValues} value={formValues.nationality} name={'nationality'} />
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