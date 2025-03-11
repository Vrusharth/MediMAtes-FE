import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Status from '../../../../components/Status';
import Header from '../../../../components/Header';
import BigButton from '../../../../components/Buttons/BigButton';
import CompleteDoctorProfilePage1 from './CompleteDoctorProfilePage1';
import CompleteDoctorProfilePage2 from './CompleteDoctorProfilePage2';
import ProgressBar from '../../../../components/ProgressBar'; // Assume you have a ProgressBar component
import { colorTheme } from '../../../../constant';
import DocumentPicker from 'react-native-document-picker'
import CompleteDoctorProfilePage3 from './CompleteDoctorProfilePage3';
import CompleteDoctorProfilePage4 from './CompleteDoctorProfilePage4';
import { useDoctorAdditionalInfo } from '../../../../Hooks/auth';
import FailAlert from '../../../../components/Alert/FailAlert';

export default function CompleteDoctorProfile() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({
    doctor_name: '',
    medical_license_number: '',
    profile_picture: null,
    languages_spoken: [],
    education_qualifications: [{
      institute_name: '',
      address: '',
      degreename: '',
      specialization: '',
      degreetype: '',
      fromdate: '',
      todate: '',
    }],
    experience: [{
      hospitalname: '',
      hospitalownership: '',
      fromdate: '',
      todate: '',
      address: '',
    }],
  });

  const { mutate, isPending, isError, error } = useDoctorAdditionalInfo();

  const addLanguage = (item) => {
    setFormValues(prevValues => ({
      ...prevValues,
      languages_spoken: [...prevValues.languages_spoken, item.value]
    }));
  };

  const removeLanguage = (language) => {
    setFormValues(prevValues => ({
      ...prevValues,
      languages_spoken: prevValues.languages_spoken.filter(item => item !== language)
    }));
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

  const addNewQualification = () => {
    setFormValues(prevValues => ({
      ...prevValues,
      education_qualifications: [
        ...prevValues.education_qualifications,
        {
          institute_name: '',
          address: '',
          degreename: '',
          specialization: '',
          degreetype: '',
          fromdate: '',
          todate: '',
        },
      ],
    }));
  };

  const updateQualification = (index, field, value) => {
    setFormValues(prevValues => {
      const updatedQualifications = [...prevValues.education_qualifications];
      updatedQualifications[index][field] = value;
      return {
        ...prevValues,
        education_qualifications: updatedQualifications,
      };
    });
  };

  const deleteQualification = (index) => {
    setFormValues(prevValues => {
      const updatedQualifications = [...prevValues.education_qualifications];
      updatedQualifications.splice(index, 1); // Remove the qualification at the specified index
      return {
        ...prevValues,
        education_qualifications: updatedQualifications,
      };
    });
  };

  const addNewExperience = () => {
    setFormValues(prevValues => ({
      ...prevValues,
      experience: [
        ...prevValues.experience,
        {
          hospitalname: '',
          hospitalownership: '',
          fromdate: '',
          todate: '',
          address: '',
        },
      ],
    }));
  };

  const updateExperience = (index, field, value) => {
    setFormValues(prevValues => {
      const updatedExperience = [...prevValues.experience];
      updatedExperience[index][field] = value;
      return {
        ...prevValues,
        experience: updatedExperience,
      };
    });
  };

  const deleteExperience = (index) => {
    setFormValues(prevValues => {
      const updatedExperience = [...prevValues.experience];
      updatedExperience.splice(index, 1); // Remove the experience at the specified index
      return {
        ...prevValues,
        experience: updatedExperience,
      };
    });
  };

  const handleContinue = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function handleSubmit() {
    const formData = new FormData();

    // Append simple fields
    formData.append('doctor_name', formValues.doctor_name);
    formData.append('medical_license_number', formValues.medical_license_number);
    formData.append('languages_spoken', JSON.stringify(formValues.languages_spoken));

    // Append profile picture with proper file structure
    if (formValues.profile_picture) {
      formData.append('profile_picture', {
        uri: formValues.profile_picture.uri,
        name: formValues.profile_picture.name || 'profile.jpg',
        type: formValues.profile_picture.type || 'image/jpeg',
      });
    }

    // Stringify complex objects
    formData.append('education_qualifications', JSON.stringify(formValues.education_qualifications));
    formData.append('experience', JSON.stringify(formValues.experience));

    mutate({ form: formData });
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <CompleteDoctorProfilePage1
            formValues={formValues}
            setFormValues={setFormValues}
            addLanguage={addLanguage}
            removeLanguage={removeLanguage}
          />
        );
      case 2:
        return (
          <CompleteDoctorProfilePage2
            formValues={formValues}
            setFormValues={setFormValues}
            pickImage={pickImage}
            removeImage={removeImage}
          />
        );
      case 3:
        return (
          <CompleteDoctorProfilePage3
            formValues={formValues}
            setFormValues={setFormValues}
            addNewQualification={addNewQualification}
            updateQualification={updateQualification}
            deleteQualification={deleteQualification}
          />
        );
      case 4:
        return (
          <CompleteDoctorProfilePage4
            formValues={formValues}
            setFormValues={setFormValues}
            addNewExperience={addNewExperience}
            updateExperience={updateExperience}
            deleteExperience={deleteExperience}
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
          formValues.doctor_name.trim() !== '' &&
          formValues.medical_license_number.trim() !== '' &&
          formValues.languages_spoken.length > 0
        );
      case 2:
        return formValues.profile_picture !== null;
      case 3:
        return formValues.education_qualifications.every(
          (qualification) =>
            qualification.institute_name.trim() !== '' &&
            qualification.address.trim() !== '' &&
            qualification.degreename.trim() !== '' &&
            qualification.specialization.trim() !== '' &&
            qualification.degreetype.trim() !== '' &&
            qualification.fromdate.trim() !== '' &&
            qualification.todate.trim() !== ''
        );
      case 4:
        return formValues.experience.length > 0
      default:
        return true;
    }
  };

  return (
    <View style={styles.container}>
      <Status />
      {currentPage === 1 ? <Header /> : <Header selfNavigate={handleBack} />}
      {isError && <FailAlert error={error?.response?.data?.message} />}
      <ProgressBar progress={currentPage / 4} />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {renderPage()}
        <View style={styles.subContainer}>
          <BigButton
            label={currentPage === 4 ? 'Submit' : 'Continue'}
            style={[styles.button, { backgroundColor: colorTheme.primaryColor }]}
            labelStyle={{ color: 'white' }}
            onPress={handleContinue}
            disabled={!isFormValid()}
            isPending={currentPage === 4 && isPending}
          />
        </View>
      </View>
    </View>
  );
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