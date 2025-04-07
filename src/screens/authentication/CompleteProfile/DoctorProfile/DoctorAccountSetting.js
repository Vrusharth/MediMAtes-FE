import { ScrollView, StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colorTheme, common_styles } from '../../../../constant';
import Status from '../../../../components/Status';
import Header from '../../../../components/Header';
import DateTimeInput from '../../../../components/Inputs/DateTimeInput';
import NormalTextInputWithIcon from '../../../../components/Inputs/NormalTextInputWithIcon';
import { validateEmtyInput } from '../../../../utils/validateRegex';
import BigButton from '../../../../components/Buttons/BigButton';
import { useDoctorAccountSettings } from '../../../../Hooks/auth';

export default function DoctorAccountSetting() {
  const [formValues, setFormValues] = useState({
    consultation_type: {
      video_call: {
        available: false,
        consultation_fee: 0,
        slot_duration: 0,
        working_hours: {
          from: '',
          to: '',
        },
        working_days: []
      },
      phone_call: {
        available: false,
        consultation_fee: 0,
        working_days: []
      },
      offline_visit: {
        available: false,
        consultation_fee: 0,
        slot_duration: 0,
        working_hours: {
          from: '',
          to: '',
        },
        working_days: []
      },
    },
    instant_chat_option: false
  });

  const { mutate, isPending, isError, error } = useDoctorAccountSettings();

  // Function to handle form submission
  function handleSubmit() {
    mutate({ body: JSON.stringify(formValues) });
  }

  // Function to update consultation type values
  // Function to update consultation type values including working hours
  function updateConsultationType(type, key, value) {
    setFormValues(prevValues => {
      // If we're updating working_hours.from or working_hours.to
      if (key === 'from' || key === 'to') {
        return {
          ...prevValues,
          consultation_type: {
            ...prevValues.consultation_type,
            [type]: {
              ...prevValues.consultation_type[type],
              working_hours: {
                ...prevValues.consultation_type[type].working_hours,
                [key]: value
              }
            }
          }
        };
      } else {
        // For all other updates
        return {
          ...prevValues,
          consultation_type: {
            ...prevValues.consultation_type,
            [type]: {
              ...prevValues.consultation_type[type],
              [key]: value
            }
          }
        };
      }
    });
  }

  // Function to toggle working days for a consultation type
  function toggleWorkingDay(type, day) {
    setFormValues((prevValues) => {
      const currentWorkingDays = prevValues.consultation_type[type].working_days;
      const updatedWorkingDays = currentWorkingDays.includes(day)
        ? currentWorkingDays.filter(d => d !== day) // Remove if already exists
        : [...currentWorkingDays, day]; // Add if not exists

      return {
        ...prevValues,
        consultation_type: {
          ...prevValues.consultation_type,
          [type]: {
            ...prevValues.consultation_type[type],
            working_days: updatedWorkingDays
          }
        },
      };
    });
  }

  // Function to validate the form
  function isFormValid() {
    const { video_call, offline_visit } = formValues.consultation_type;

    // Validate Video Call
    const isVideoCallValid = !video_call.available || (
      video_call.slot_duration > 0 &&
      video_call.working_hours.from.trim() !== "" &&
      video_call.working_hours.to.trim() !== ""
    );

    // Validate Offline Visit
    const isOfflineVisitValid = !offline_visit.available || (
      offline_visit.slot_duration > 0 &&
      offline_visit.working_hours.from.trim() !== "" &&
      offline_visit.working_hours.to.trim() !== ""
    );

    // Return true only if all sections are valid
    return isVideoCallValid && isOfflineVisitValid;
  }

  const dayNames = [
    { day: 'Mon', completeDay: 'Monday' },
    { day: 'Tue', completeDay: 'Tuesday' },
    { day: 'Wed', completeDay: 'Wednesday' },
    { day: 'Thu', completeDay: 'Thursday' },
    { day: 'Fri', completeDay: 'Friday' },
    { day: 'Sat', completeDay: 'Saturday' },
    { day: 'Sun', completeDay: 'Sunday' },
  ]

  return (
    <View style={styles.container}>
      <Status />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.subContainer}>
        <Text style={[common_styles.extra_large_text_large_weight, { fontSize: 25, marginBottom: 10 }]}>Consultation Methods</Text>

        {/* Phone Call Section */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[common_styles.large_text_large_weight, { marginBlock: 10 }]}>Phone Call</Text>
            <Switch
              thumbColor={formValues.consultation_type.phone_call.available ? 'white' : colorTheme.borderColor}
              trackColor={{ false: '#767577', true: colorTheme.primaryColor }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => updateConsultationType('phone_call', 'available', !formValues.consultation_type.phone_call.available)}
              value={formValues.consultation_type.phone_call.available}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Consultation Fees (₹)</Text>
            <NormalTextInputWithIcon
              placeholder={'30 mins'}
              validationFunc={validateEmtyInput}
              inputMode={'numeric'}
              value={formValues.consultation_type.phone_call.consultation_fee.toString()}
              onChangeFunc={(text) => updateConsultationType('phone_call', 'consultation_fee', parseInt(text) || 0)}
              disabled={!formValues.consultation_type.phone_call.available}
            />
          </View>
          {formValues.consultation_type.phone_call.available &&
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {dayNames.map((item, index) => {
                const isSelected = formValues.consultation_type.phone_call.working_days.includes(item.completeDay);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleWorkingDay('phone_call', item.completeDay)}
                    style={{
                      width: 42,
                      height: 42,
                      backgroundColor: isSelected ? colorTheme.primaryColor : colorTheme.borderColor,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={[common_styles.small_text_normal_weight, {
                      color: isSelected ? 'white' : colorTheme.textColor,
                      fontSize: 13
                    }]}>
                      {item.day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        </View>

        {/* Video Call Section */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[common_styles.large_text_large_weight, { marginBlock: 10 }]}>Video Call</Text>
            <Switch
              thumbColor={formValues.consultation_type.video_call.available ? 'white' : colorTheme.borderColor}
              trackColor={{ false: '#767577', true: colorTheme.primaryColor }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => updateConsultationType('video_call', 'available', !formValues.consultation_type.video_call.available)}
              value={formValues.consultation_type.video_call.available}
            />
          </View>
          <View>
            <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Consultation Fees (₹)</Text>
            <NormalTextInputWithIcon
              placeholder={'30 mins'}
              validationFunc={validateEmtyInput}
              inputMode={'numeric'}
              value={formValues.consultation_type.video_call.consultation_fee.toString()}
              onChangeFunc={(text) => updateConsultationType('video_call', 'consultation_fee', parseInt(text) || 0)}
              disabled={!formValues.consultation_type.video_call.available}
            />
            <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Slot Duration</Text>
            <NormalTextInputWithIcon
              placeholder={'30 mins'}
              validationFunc={validateEmtyInput}
              inputMode={'numeric'}
              value={formValues.consultation_type.video_call.slot_duration.toString()}
              onChangeFunc={(text) => updateConsultationType('video_call', 'slot_duration', parseInt(text) || 0)}
              disabled={!formValues.consultation_type.video_call.available}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBlock: 5 }}>
              <View>
                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>From</Text>
                <DateTimeInput
                  disabled={!formValues.consultation_type.video_call.available}
                  mode="time"
                  onChangeValue={(val) => {
                    const timeString = new Date(val).toTimeString().split(" GMT")[0];
                    updateConsultationType('video_call', 'from', timeString);
                  }}
                  value={formValues.consultation_type.video_call.working_hours.from}
                />
              </View>
              <View>
                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>To</Text>
                <DateTimeInput
                  disabled={!formValues.consultation_type.video_call.available}
                  mode="time"
                  onChangeValue={(val) => {
                    const timeString = new Date(val).toTimeString().split(" GMT")[0];
                    console.log('dhdh', timeString);

                    updateConsultationType('video_call', 'to', timeString);
                  }}
                  value={formValues.consultation_type.video_call.working_hours.to}
                />
              </View>
            </View>
          </View>
          {formValues.consultation_type.video_call.available &&
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {dayNames.map((item, index) => {
                const isSelected = formValues.consultation_type.video_call.working_days.includes(item.completeDay);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleWorkingDay('video_call', item.completeDay)}
                    style={{
                      width: 42,
                      height: 42,
                      backgroundColor: isSelected ? colorTheme.primaryColor : colorTheme.borderColor,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={[common_styles.small_text_normal_weight, {
                      color: isSelected ? 'white' : colorTheme.textColor,
                      fontSize: 13
                    }]}>
                      {item.day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        </View>

        {/* Offline Visit Section */}
        <View style={{ marginBlock: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[common_styles.large_text_large_weight, { marginBlock: 10 }]}>Offline Visit</Text>
            <Switch
              thumbColor={formValues.consultation_type.offline_visit.available ? 'white' : colorTheme.borderColor}
              trackColor={{ false: '#767577', true: colorTheme.primaryColor }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => updateConsultationType('offline_visit', 'available', !formValues.consultation_type.offline_visit.available)}
              value={formValues.consultation_type.offline_visit.available}
            />
          </View>
          <View>
            <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Consultation Fees (₹)</Text>
            <NormalTextInputWithIcon
              placeholder={'30 mins'}
              validationFunc={validateEmtyInput}
              inputMode={'numeric'}
              value={formValues.consultation_type.offline_visit.consultation_fee.toString()}
              onChangeFunc={(text) => updateConsultationType('offline_visit', 'consultation_fee', parseInt(text) || 0)}
              disabled={!formValues.consultation_type.offline_visit.available}
            />
            <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Slot Duration</Text>
            <NormalTextInputWithIcon
              placeholder={'30 mins'}
              validationFunc={validateEmtyInput}
              inputMode={'numeric'}
              value={formValues.consultation_type.offline_visit.slot_duration.toString()}
              onChangeFunc={(text) => updateConsultationType('offline_visit', 'slot_duration', parseInt(text) || 0)}
              disabled={!formValues.consultation_type.offline_visit.available}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBlock: 5 }}>
              <View>
                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>From</Text>
                <DateTimeInput
                  disabled={!formValues.consultation_type.offline_visit.available}
                  mode="time"
                  onChangeValue={(val) => {
                    const timeString = new Date(val).toTimeString().split(" GMT")[0];
                    updateConsultationType('offline_visit', 'from', timeString);
                  }}
                  value={formValues.consultation_type.offline_visit.working_hours.to}
                />
              </View>
              <View>
                <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>To</Text>
                <DateTimeInput
                  disabled={!formValues.consultation_type.offline_visit.available}
                  mode="time"
                  onChangeValue={(val) => {
                    const timeString = new Date(val).toTimeString().split(" GMT")[0];
                    updateConsultationType('offline_visit', 'to', timeString);
                  }}
                  value={formValues.consultation_type.offline_visit.working_hours.to}
                />
              </View>
            </View>
          </View>
          {formValues.consultation_type.offline_visit.available &&
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {dayNames.map((item, index) => {
                const isSelected = formValues.consultation_type.offline_visit.working_days.includes(item.completeDay);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleWorkingDay('offline_visit', item.completeDay)}
                    style={{
                      width: 42,
                      height: 42,
                      backgroundColor: isSelected ? colorTheme.primaryColor : colorTheme.borderColor,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={[common_styles.small_text_normal_weight, {
                      color: isSelected ? 'white' : colorTheme.textColor,
                      fontSize: 13
                    }]}>
                      {item.day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        </View>

        {/* Instant Chat Option Section */}
        <View style={{ marginBlock: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[common_styles.large_text_large_weight, { marginBlock: 10 }]}>Instant Chat</Text>
            <Switch
              thumbColor={formValues.instant_chat_option ? 'white' : colorTheme.borderColor}
              trackColor={{ false: '#767577', true: colorTheme.primaryColor }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(val) => setFormValues(prev => ({...prev, instant_chat_option: val}))}
              value={formValues.instant_chat_option}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.subContainer}>
        <BigButton
          label={'Submit'}
          style={[{ backgroundColor: colorTheme.primaryColor }]}
          labelStyle={{ color: 'white' }}
          onPress={handleSubmit}
          disabled={!isFormValid()}
          isPending={isPending}
        />
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