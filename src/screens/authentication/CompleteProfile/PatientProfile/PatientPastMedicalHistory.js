import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState } from 'react';
import Status from '../../../../components/Status';
import Header from '../../../../components/Header';
import { colorTheme, common_styles } from '../../../../constant';
import NormalTextInputWithIcon from '../../../../components/Inputs/NormalTextInputWithIcon';
import BigButton from '../../../../components/Buttons/BigButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from '../../../../components/Buttons/IconButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ArrayInput from '../../../../components/Inputs/ArrayInput';
import { validateEmtyInput } from '../../../../utils/validateRegex';
import DateTimeInput from '../../../../components/Inputs/DateTimeInput';
import { usePatientMedicalHistory } from '../../../../Hooks/auth';

export default function PatientPastMedicalHistory() {
  const [formValues, setFormValues] = useState({
    allergies: [],
    chronic_diseases: [],
    medications: [{
      name: "",
      dosage: "",
      frequency: ""
    }],
    surgeries: [{
      name: "",
      date: "",
      notes: ""
    }],
    vaccinations: [{
      name: "",
      date: "",
    }],
    lifestyle_habits: {
      smoking: false,
      alcohol_consumption: false,
      exercise_frequency: ""
    }
  });

  const { mutate, isPending, isError, error } = usePatientMedicalHistory();

  function handleSubmit(params) {
    mutate({ body: JSON.stringify(formValues) })
  }

  function isFormValid() {
    const { allergies, chronic_diseases, medications, surgeries, vaccinations, lifestyle_habits } = formValues;

    // Validate Vaccinations
    const areVaccinationsValid = vaccinations.every(vaccination => {
      return vaccination.name.trim() !== "" && vaccination.date.trim() !== "";
    });

    // Validate Surgeries
    const areSurgeriesValid = surgeries.every(surgery => {
      return surgery.name.trim() !== "" && surgery.date.trim() !== "" && surgery.notes.trim() !== "";
    });

    // Validate Medications
    const areMedicationsValid = medications.every(medication => {
      return medication.name.trim() !== "" && medication.dosage.trim() !== "" && medication.frequency.trim() !== "";
    });

    // Validate Lifestyle Habits (optional fields, no strict validation needed)
    const areLifestyleHabitsValid = true; // No strict validation for lifestyle habits

    // Return true only if all sections are valid
    return areVaccinationsValid && areSurgeriesValid && areMedicationsValid && areLifestyleHabitsValid;
  }

  // Function to add a new allergy
  const addAllergy = (allergy) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      allergies: [...prevValues.allergies, allergy],
    }));
  };

  // Function to remove an allergy
  const removeAllergy = (allergy) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      allergies: prevValues.allergies.filter((item) => item !== allergy),
    }));
  };

  // Function to add a new chronic disease
  const addChronic = (Chronic) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      chronic_diseases: [...prevValues.chronic_diseases, Chronic],
    }));
  };

  // Function to remove a chronic disease
  const removeChronic = (Chronic) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      chronic_diseases: prevValues.chronic_diseases.filter((item) => item !== Chronic),
    }));
  };

  // Function to add a new vaccination
  const addVaccination = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      vaccinations: [...prevValues.vaccinations, { name: "", date: "" }],
    }));
  };

  // Function to update a vaccination field
  const updateVaccination = (index, field, value) => {
    setFormValues((prevValues) => {
      const updatedVaccinations = [...prevValues.vaccinations];
      updatedVaccinations[index][field] = value;
      return {
        ...prevValues,
        vaccinations: updatedVaccinations,
      };
    });
  };

  // Function to remove a vaccination
  const removeVaccination = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      vaccinations: prevValues.vaccinations.filter((_, i) => i !== index),
    }));
  };

  // Function to add a new surgery
  const addSurgery = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      surgeries: [...prevValues.surgeries, { name: "", date: "", notes: "" }],
    }));
  };

  // Function to update a surgery field
  const updateSurgery = (index, field, value) => {
    setFormValues((prevValues) => {
      const updatedSurgeries = [...prevValues.surgeries];
      updatedSurgeries[index][field] = value;
      return {
        ...prevValues,
        surgeries: updatedSurgeries,
      };
    });
  };

  // Function to remove a surgery
  const removeSurgery = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      surgeries: prevValues.surgeries.filter((_, i) => i !== index),
    }));
  };

  // Function to add a new medication
  const addMedication = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      medications: [...prevValues.medications, { name: "", dosage: "", frequency: "" }],
    }));
  };

  // Function to update a medication field
  const updateMedication = (index, field, value) => {
    setFormValues((prevValues) => {
      const updatedMedications = [...prevValues.medications];
      updatedMedications[index][field] = value;
      return {
        ...prevValues,
        medications: updatedMedications,
      };
    });
  };

  const removeMedication = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      medications: prevValues.medications.filter((_, i) => i !== index),
    }));
  };

  // Function to update lifestyle habits
  const updateLifestyleHabits = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      lifestyle_habits: {
        ...prevValues.lifestyle_habits,
        [field]: value,
      },
    }));
  };

  return (
    <View style={styles.container}>
      <Status />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.subContainer, { paddingBlock: 10 }]}>
        <Text style={[common_styles.extra_large_text_large_weight, { fontSize: 25, marginBottom: 10 }]}>User's Medical History</Text>

        {/* Allergies Section */}
        <ArrayInput
          label="Allergies"
          values={formValues.allergies}
          onAdd={addAllergy}
          onRemove={removeAllergy}
          placeholder="Add Allergy"
        />

        {/* Chronic Diseases Section */}
        <ArrayInput
          label="Chronic Diseases"
          values={formValues.chronic_diseases}
          onAdd={addChronic}
          onRemove={removeChronic}
          placeholder="Add Chronic Diseases"
        />

        {/* Lifestyle Habits Section */}
        <View>
          <Text style={[common_styles.large_text_large_weight, { marginBottom: 3 }]}>Lifestyle Habits</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Smoking?</Text>
            <Switch
              thumbColor={formValues.lifestyle_habits.smoking ? 'white' : colorTheme.borderColor}
              trackColor={{ false: '#767577', true: colorTheme.primaryColor }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => updateLifestyleHabits('smoking', !formValues.lifestyle_habits.smoking)}
              value={formValues.lifestyle_habits.smoking}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Alcohol Consumption?</Text>
            <Switch
              thumbColor={formValues.lifestyle_habits.alcohol_consumption ? 'white' : colorTheme.borderColor}
              trackColor={{ false: '#767577', true: colorTheme.primaryColor }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => updateLifestyleHabits('alcohol_consumption', !formValues.lifestyle_habits.alcohol_consumption)}
              value={formValues.lifestyle_habits.alcohol_consumption}
            />
          </View>
          <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Exercise Frequency</Text>
          <NormalTextInputWithIcon
            placeholder="Exercise Frequency"
            onChangeFunc={(text) => updateLifestyleHabits('exercise_frequency', text)}
            style={{ marginBlock: 5 }}
          />
        </View>

        {/* Vaccinations Section */}
        <View>
          <Text style={[common_styles.large_text_large_weight, { marginBottom: 3 }]}>Vaccinations</Text>
          {formValues.vaccinations.map((vaccination, index) => (
            <View key={index}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Vaccinations {index + 1}</Text>
                <IconButton
                  IconCategory={MaterialCommunityIcons}
                  iconName={"delete"}
                  color={colorTheme.primaryColor}
                  size={20}
                  onPress={() => removeVaccination(index)}
                  style={{ alignSelf: 'flex-end', marginTop: 5 }}
                />
              </View>
              <View style={{ marginBottom: 15 }}>
                <NormalTextInputWithIcon
                  placeholder="Vaccine Name"
                  validationFunc={validateEmtyInput}
                  onChangeFunc={(text) => updateVaccination(index, 'name', text)}
                  style={{ marginBlock: 5 }}
                />
                <DateTimeInput
                  mode="date"
                  onChangeValue={(val) => updateVaccination(index, 'date', new Date(val).toISOString().split("T")[0])}
                />
              </View>
            </View>
          ))}
          <BigButton
            label="Add Vaccination"
            labelStyle={{ color: colorTheme.primaryColor }}
            onPress={addVaccination}
            style={{ marginTop: 10, borderWidth: 1, borderColor: colorTheme.primaryColor }}
          />
        </View>

        {/* Surgeries Section */}
        <View>
          <Text style={[common_styles.large_text_large_weight, { marginBottom: 3 }]}>Surgeries</Text>
          {formValues.surgeries.map((surgery, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Surgeries {index + 1}</Text>
                <IconButton
                  IconCategory={MaterialCommunityIcons}
                  iconName={"delete"}
                  color={colorTheme.primaryColor}
                  size={20}
                  onPress={() => removeSurgery(index)}
                  style={{ alignSelf: 'flex-end', marginTop: 5 }}
                />
              </View>
              <Text style={[common_styles.small_text_normal_weight, { marginBottom: 3 }]}>Surgery Name</Text>
              <NormalTextInputWithIcon
                placeholder="Surgery name"
                validationFunc={validateEmtyInput}
                onChangeFunc={(text) => updateSurgery(index, 'name', text)}
                style={{ marginBlock: 5 }}
              />
              <Text style={[common_styles.small_text_normal_weight, { marginBottom: 3 }]}>Surgery Date</Text>
              <DateTimeInput
                mode="date"
                onChangeValue={(val) => updateSurgery(index, 'date', new Date(val).toISOString().split("T")[0])}
              />
              <Text style={[common_styles.small_text_normal_weight, { marginBottom: 3 }]}>Any Notes?</Text>
              <NormalTextInputWithIcon
                placeholder="Notes"
                onChangeFunc={(text) => updateSurgery(index, 'notes', text)}
                style={{ marginBlock: 5 }}
              />
            </View>
          ))}
          <BigButton
            label="Add Surgery"
            onPress={addSurgery}
            labelStyle={{ color: colorTheme.primaryColor }}
            style={{ marginTop: 10, borderWidth: 1, borderColor: colorTheme.primaryColor }}
          />
        </View>

        {/* Medications Section */}
        <View>
          <Text style={[common_styles.large_text_large_weight, { marginBottom: 3 }]}>Medications</Text>
          {formValues.medications.map((medication, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Medication {index + 1}</Text>
                <IconButton
                  IconCategory={MaterialCommunityIcons}
                  iconName={"delete"}
                  color={colorTheme.primaryColor}
                  size={20}
                  onPress={() => removeMedication(index)}
                  style={{ alignSelf: 'flex-end', marginTop: 5 }}
                />
              </View>
              <Text style={[common_styles.small_text_normal_weight, { marginBottom: 3 }]}>Medication Name</Text>
              <NormalTextInputWithIcon
                placeholder="Medication name"
                validationFunc={validateEmtyInput}
                onChangeFunc={(text) => updateMedication(index, 'name', text)}
                style={{ marginBlock: 5 }}
              />
              <Text style={[common_styles.small_text_normal_weight, { marginBottom: 3 }]}>Dosage</Text>
              <NormalTextInputWithIcon
                placeholder="Dosage"
                onChangeFunc={(text) => updateMedication(index, 'dosage', text)}
                style={{ marginBlock: 5 }}
              />
              <Text style={[common_styles.small_text_normal_weight, { marginBottom: 3 }]}>Frequency</Text>
              <NormalTextInputWithIcon
                placeholder="Frequency"
                onChangeFunc={(text) => updateMedication(index, 'frequency', text)}
                style={{ marginBlock: 5 }}
              />
            </View>
          ))}
          <BigButton
            label="Add Medication"
            onPress={addMedication}
            labelStyle={{ color: colorTheme.primaryColor }}
            style={{ marginTop: 10, borderWidth: 1, borderColor: colorTheme.primaryColor }}
          />
        </View>
      </ScrollView>
      <BigButton
        label={"Submit"}
        style={[styles.subContainer, { backgroundColor: colorTheme.primaryColor }]}
        labelStyle={{ color: 'white' }}
        disabled={!isFormValid()}
        isPending={isPending}
        onPress={handleSubmit}
      />
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