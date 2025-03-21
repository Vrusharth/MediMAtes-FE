import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme } from '../../../../constant';
import Header from '../../../../components/Header';
import Status from '../../../../components/Status';
import ProgressBar from '../../../../components/ProgressBar';
import DocumentPicker from 'react-native-document-picker'
import BigButton from '../../../../components/Buttons/BigButton';
import CompletePatientProfilePage1 from './CompletePatientProfilePage1';
import CompletePatientProfilePage2 from './CompletePatientProfilePage2';
import CompletePatientProfilePage3 from './CompletePatientProfilePage3';
import { usePatientAdditionalInfo } from '../../../../Hooks/auth';

export default function CompletePatientProfile() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({
    full_name: '',
    date_of_birth: '',
    gender: '',
    blood_group: '',
    marital_status: '',
    occupation: '',
    nationality: '',

    profile_picture: null,

    contact_number: '',
    emergency_contact: {
      name: '',
      relationship: '',
      phone: '',
    },
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
    },
  });

  const { mutate, isPending, isError, error } = usePatientAdditionalInfo();

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const removeImage = () => {
    setFormValues(prevValues => ({
      ...prevValues,
      profile_picture: null
    }));
  };

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images], // Allow only image files
      });
      setFormValues(prevValues => ({
        ...prevValues,
        profile_picture: result
      }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled image picker");
      } else {
        console.error("Error picking image:", err);
      }
    }
  };

  function handleSubmit() {
    const formData = new FormData();

    // Append simple fields
    formData.append('full_name', formValues.full_name);
    formData.append('date_of_birth', formValues.date_of_birth);
    formData.append('gender', formValues.gender);
    formData.append('blood_group', formValues.blood_group);
    formData.append('contact_number', formValues.contact_number);
    formData.append('marital_status', formValues.marital_status);
    formData.append('occupation', formValues.occupation);
    formData.append('nationality', formValues.nationality);

    // Append profile picture with proper file structure
    if (formValues.profile_picture) {
      formData.append('profile_picture', {
        uri: formValues.profile_picture.uri,
        name: formValues.profile_picture.name || 'profile.jpg', // Fallback name
        type: formValues.profile_picture.type || 'image/jpeg', // Fallback type
      });
    } else {
      console.error('Profile picture is required!');
      return; // Stop submission if profile picture is missing
    }
    // Stringify complex objects
    formData.append('emergency_contact', JSON.stringify(formValues.emergency_contact));
    formData.append('address', JSON.stringify(formValues.address));

    // Call the mutation
    mutate({ form: formData });
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <CompletePatientProfilePage1
            formValues={formValues}
            setFormValues={setFormValues}
          />
        );
      case 2:
        return (
          <CompletePatientProfilePage2
            formValues={formValues}
            pickImage={pickImage}
            removeImage={removeImage}
          />
        );
      case 3:
        return (
          <CompletePatientProfilePage3
            formValues={formValues}
            setFormValues={setFormValues}
          />
        );
      default:
        return null;
    }
  };

  const isFormValid = () => {
    switch (currentPage) {
      case 1:
        return (
          formValues.full_name.trim() !== '' &&
          formValues.date_of_birth.trim() !== '' &&
          formValues.gender.trim() !== '' &&
          formValues.blood_group.trim() !== '' &&
          formValues.marital_status.trim() !== '' &&
          formValues.occupation.trim() !== '' &&
          formValues.nationality.trim() !== ''
        );
      case 2:
        return formValues.profile_picture !== null;
      case 3:
        return ((
          formValues.emergency_contact.name.trim() !== '' &&
          formValues.emergency_contact.relationship.trim() !== '' &&
          formValues.emergency_contact.phone.trim() !== ''
        ) &&
          (
            formValues.address.street.trim() !== '' &&
            formValues.address.city.trim() !== '' &&
            formValues.address.state.trim() !== '' &&
            formValues.address.country.trim() !== '' &&
            formValues.address.zip_code.trim() !== ''
          ) && formValues.contact_number
        );
      default:
        return true;
    }
  };

  const handleContinue = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
    else {
      handleSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <Status />
      {currentPage === 1 ? <Header /> : <Header selfNavigate={handleBack} />}
      {/* {isError && <FailAlert error={error?.response?.data?.message} />} */}
      <ProgressBar progress={currentPage / 3} />
      <View style={{ flex: 1, justifyContent: 'space-between', }}>
        <ScrollView contentContainerStyle={[styles.subContainer, {}]} showsVerticalScrollIndicator={false}>
          {renderPage()}
        </ScrollView>
        <View style={[styles.subContainer, {}]}>
          <BigButton
            label={currentPage === 3 ? 'Submit' : 'Continue'}
            style={[styles.button, { backgroundColor: colorTheme.primaryColor }]}
            labelStyle={{ color: 'white' }}
            onPress={handleContinue}
            disabled={!isFormValid()}
            isPending={currentPage === 3 && isPending}
          />
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