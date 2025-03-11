import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colorTheme, common_styles } from '../../../../constant';
import NormalTextInputWithIcon from '../../../../components/Inputs/NormalTextInputWithIcon';
import NormalDropDown from '../../../../components/DropDown/NormalDropDown';
import { languageDropDownData } from '../../../../assets/Data/DropDownData';
import IconButton from '../../../../components/Buttons/IconButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { validateEmtyInput } from '../../../../utils/validateRegex';

const CompleteDoctorProfilePage1 = ({ formValues, setFormValues, addLanguage, removeLanguage }) => {
  return (
    <View>
      <Text style={[common_styles.extra_large_text_large_weight,styles.subContainer, { marginTop:10,fontSize:25 }]}>Name and details</Text>
      <ScrollView contentContainerStyle={[styles.subContainer, {}]} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5, }]}>Medical License Number</Text>
          <NormalTextInputWithIcon placeholder={'A3212'} validationFunc={validateEmtyInput} setFormValues={setFormValues} value={formValues.medical_license_number} name={'medical_license_number'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 5, }]}>Full Name</Text>
          <NormalTextInputWithIcon placeholder={'Dr. John'} validationFunc={validateEmtyInput} setFormValues={setFormValues} value={formValues.doctor_name} name={'doctor_name'} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 10 }]}>Languages Spoken</Text>
          <NormalDropDown data={languageDropDownData} placeholder={'Languages Spoken'} setFormValues={setFormValues} name={'languages_spoken'} value={formValues.languages_spoken} onChange={addLanguage} isInputArray={true} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {formValues.languages_spoken.map((item, index) => (
                <View
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: colorTheme.borderColor,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5
                  }}>
                  <Text>{item}</Text>
                  <IconButton onPress={() => removeLanguage(item)} IconCategory={Fontisto} color={colorTheme.accentColor} size={15} iconName={'close'} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
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
});

export default CompleteDoctorProfilePage1;