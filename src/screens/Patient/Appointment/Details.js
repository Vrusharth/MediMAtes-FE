import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetHandle } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorTheme, common_styles } from '../../../constant';
import Status from '../../../components/Status';
import Header from '../../../components/Header';
import IconButton from '../../../components/Buttons/IconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import Underline from '../../../components/Underline';
import BigButton from '../../../components/Buttons/BigButton';
import ProgressBar from '../../../components/ProgressBar';
import { truncateText } from '../../../utils/commonFunction';
import FullCarousel from '../../../components/Carousel/FullCarousel';
import { useDoctorDetail } from '../../../Hooks/appointment';
import Loading from '../../../components/Alert/Loading';
import RadioButton from '../../../components/Inputs/RadioButton';
import { useNavigation } from '@react-navigation/native';


function ReviewProgress({ index }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center', // ensures vertical alignment
        marginTop: 10,
        justifyContent: 'space-evenly',
      }}
    >
      <Text style={common_styles.small_text_normal_weight}>{index + 1}</Text>
      <MaterialIcons
        name="star"
        size={20}
        color={colorTheme.primaryColor}
        style={{ marginHorizontal: 5 }}
      />
      <ProgressBar
        progress={index / 4}
        width={'60%'}
        style={{ margin: 8 }}
      />
      <Text style={common_styles.small_text_normal_weight}>Excellent</Text>
    </View>
  )
}

function ReviewCard(item) {
  return (
    <View style={{ marginTop: 5, elevation: 2, backgroundColor: 'white', padding: 10, borderRadius: 10, height: 200, }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Image source={{ uri: item?.data?.patientdetails?.profile_picture }} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 50 }} />
          <View>
            <Text style={[common_styles.small_text_normal_weight]}>{item?.data?.patientdetails?.full_name}</Text>
            <Text style={[common_styles.small_text_normal_weight, { color: 'gray' }]}>{new Date(item?.data?.updatedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</Text>
          </View>
        </View>
        <IconButton label={`${item?.data?.rating}`} IconCategory={MaterialIcons} iconName={'star'} color={colorTheme.primaryColor} size={15} />
      </View>
      <Text style={[common_styles.small_text_normal_weight, { marginBlock: 5, }]}>
        {truncateText(item?.data?.review, 250)}
      </Text>
    </View>
  )
}

const generateTimeSlots = (startTime, endTime, slotDuration) => {
  const slots = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  let currentHour = startHour;
  let currentMin = startMin;

  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    const startTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;

    currentMin += slotDuration;
    if (currentMin >= 60) {
      currentHour += Math.floor(currentMin / 60);
      currentMin = currentMin % 60;
    }

    const endTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
    slots.push(`${startTimeStr}-${endTimeStr}`);
  }

  return slots;
};


const Details = ({ route }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cusultion_type, setCusultion_type] = useState("video_call")

  const navigation=useNavigation();

  const availabilitySheetRef = useRef(null);
  const availabilitySnapPoints = useMemo(() => ['50%', '100%'], []);

  // for timeslot availibity bottomsheet
  const [showAvailabilitySheet, setShowAvailabilitySheet] = useState(false);

  const { id } = route.params;

  const { data: docData, isLoading: docLoading, isError: isDocError } = useDoctorDetail(id);

  const renderHandle = useCallback((props) => (
    <BottomSheetHandle {...props} />
  ), []);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };



  // Get video call details from API
  const consultationDetails = docData?.data?.availability?.consultation_type?.[cusultion_type] || {};
  const workingDays = consultationDetails?.working_days || [];
  const workingHours = consultationDetails?.working_hours || { from: '09:00', to: '09:00' };
  const slotDuration = consultationDetails?.slot_duration || 30;

  // Generate time slots
  const timeSlots = useMemo(() => {
    return generateTimeSlots(
      workingHours.from.split(':').slice(0, 2).join(':'),
      workingHours.to.split(':').slice(0, 2).join(':'),
      slotDuration
    );
  }, [workingHours, slotDuration]);

  // Add this function to your component
  const isTimeSlotBooked = (date, timeSlot) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const slotStartTime = timeSlot.split('-')[0];

    return docData?.data?.bookedAppointments?.some(appointment => {
      const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
      const appointmentTime = appointment.time_slot.from;

      return (
        appointmentDate === formattedDate &&
        appointmentTime === slotStartTime
      );
    });
  };

  const AvailabilityBottomSheet = ({ timeSlots, isWorkingDay, selectedDate, handleClose }) => {
    return (
      <BottomSheet
        ref={availabilitySheetRef}
        snapPoints={availabilitySnapPoints}
        index={0}
        enablePanDownToClose={true}
        onClose={handleClose}
      >
        <BottomSheetView style={styles.availabilitySheetContainer}>
          <Text style={[common_styles.large_text_normal_weight, { textAlign: 'center', marginBottom: 15 }]}>
            Available Time Slots
          </Text>
          <ScrollView>
            <View style={styles.availabilityGrid}>
              {timeSlots.length === 0 ? (
                <Text style={[common_styles.medium_text_normal_weight, { textAlign: 'center' }]}>
                  No available time slots for this day
                </Text>
              ) : (
                timeSlots.map((slot, index) => {
                  const isBooked = isTimeSlotBooked(selectedDate, slot);

                  return (
                    <Pressable
                      key={index}
                      style={[
                        styles.availabilityCell,
                        isWorkingDay(selectedDate) && styles.availableCell,
                        isBooked && styles.bookedCell
                      ]}
                      disabled={!isWorkingDay(selectedDate) || isBooked}
                    >
                      <Text style={[
                        common_styles.medium_text_normal_weight,
                        isBooked && styles.bookedText
                      ]}>
                        {slot.split('-')[0]} - {slot.split('-')[1]}
                      </Text>
                      {isBooked && (
                        <Text style={[common_styles.small_text_normal_weight, styles.bookedLabel]}>
                          Booked
                        </Text>
                      )}
                    </Pressable>
                  );
                })
              )}
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    );
  };

  const isDoctorAvailable = (date, consultationType) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const consultationDetails = docData?.data?.availability?.consultation_type?.[consultationType] || {};
    return consultationDetails?.working_days?.includes(dayName);
  };

  // Check if a date is a working day
  const isWorkingDay = (date) => {
    return isDoctorAvailable(date, cusultion_type);
  };

  if (docLoading) return <Loading />;

  // Modified renderWeekDates function
  const renderWeekDates = () => {
    const currentDate = new Date(selectedDate);
    const currentDateNum = currentDate.getDate();

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDateNum - 3);

    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

      const isSelected = date.toDateString() === currentDate.toDateString();
      const isDisabled = dateOnly < todayDateOnly || !isDoctorAvailable(date, cusultion_type);

      days.push(
        <View key={`day-${i}`} style={styles.dayColumn}>
          <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 2 }]}>
            {dayNames[date.getDay()]}
          </Text>
          <TouchableOpacity
            style={[
              styles.dateContainer,
              isSelected && styles.selectedDateContainer,
              isDisabled && styles.disabledDate
            ]}
            onPress={() => !isDisabled && setSelectedDate(date)}
            disabled={isDisabled}
          >
            <Text style={[
              common_styles.medium_text_normal_weight,
              isSelected && styles.selectedDateText,
              isDisabled && styles.disabledDateText
            ]}>
              {date.getDate()}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return days;
  };

  const handleWeekChange = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction * 7));
    setSelectedDate(newDate);
  };

  return (
    <View style={styles.container}>
      <Status />
      <View style={{ height: 320 }}>
        <Header rightIcon={'share-variant-outline'} />
        <View style={[styles.subContainer]}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ width: '45%', alignSelf: 'center' }}>
              <IconButton style={{ width: '50%' }} IconCategory={Ionicons} color={colorTheme.secondaryColor} iconName={'star'} size={20} label={`${docData?.data?.availability?.doctor?.avg_rating}`} />
              <Text style={[common_styles.extra_large_text_large_weight, { fontSize: 27 }]}>{docData?.data?.additionalinfo?.doctor_name}</Text>
              <Text style={[common_styles.medium_text_normal_weight, {}]}>{docData?.data?.additionalinfo?.education_qualifications[0]?.specialization}</Text>
            </View>
            <View>
              <Image source={require('../../../assets/img/doctor.png')} style={{ width: 225, height: 340, objectFit: 'cover', borderRadius: 50 }} />
            </View>
          </View>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleComponent={renderHandle}
        index={0}
        topInset={50}
      >
        <BottomSheetView style={[styles.BottomContainer,]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
              <RadioButton label={"Video Call"} selected={cusultion_type === 'video_call'} onPress={() => setCusultion_type('video_call')} />
              <RadioButton label={"Phone Call"} selected={cusultion_type === 'phone_call'} onPress={() => setCusultion_type('phone_call')} />
              <RadioButton label={"Offline Visit"} selected={cusultion_type === 'offline_visit'} onPress={() => setCusultion_type('offline_visit')} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 }}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={[common_styles.medium_text_normal_weight]}>
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleWeekChange(-1)}>
                  <MaterialIcons name={"keyboard-arrow-left"} size={25} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleWeekChange(1)}>
                  <MaterialIcons name={"keyboard-arrow-right"} size={25} color={'black'} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
              {renderWeekDates()}
            </ScrollView>
            <Underline style={{ marginBlock: 10 }} />
            <Text onPress={() => setShowAvailabilitySheet(true)} style={[common_styles.medium_text_normal_weight, { color: colorTheme.primaryColor, textAlign: 'right', }]}>{"View all availability >"}</Text>
            <View style={{
              flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10
            }}>
              {/* Replace the time slots rendering section with this */}
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 5
              }}>
                {!isDoctorAvailable(selectedDate, cusultion_type) ? (
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 10 }}>
                    <Text style={[common_styles.small_text_normal_weight, { color: 'red' }]}>
                      Doctor not available for {cusultion_type.replace('_', ' ')} on {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                    </Text>
                  </View>
                ) : timeSlots.length === 0 ? (
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 10 }}>
                    <Text style={[common_styles.small_text_normal_weight, { color: 'red' }]}>
                      No time slots available for today
                    </Text>
                  </View>
                ) : (
                  timeSlots.slice(0, 8).map((slot, index) => {
                    const isBooked = isTimeSlotBooked(selectedDate, slot);
                    return (
                      <Pressable
                        key={index}
                        style={[
                          styles.cell,
                          styles.availableCell,
                          isBooked && styles.bookedCell
                        ]}
                        disabled={isBooked}
                      >
                        <Text style={[
                          common_styles.small_text_normal_weight,
                          isBooked && styles.bookedText
                        ]}>
                          {slot.split('-')[0]}
                        </Text>
                        <Text style={[
                          common_styles.small_text_normal_weight,
                          isBooked && styles.bookedText
                        ]}>
                          {slot.split('-')[0].split(':')[0] >= 12 ? 'PM' : 'AM'}
                        </Text>
                        {isBooked && (
                          <Text style={[common_styles.small_text_normal_weight, styles.bookedLabel]}>
                            Booked
                          </Text>
                        )}
                      </Pressable>
                    );
                  })
                )}
              </View>
            </View>
            <View style={{}}>
              <Text style={[common_styles.large_text_normal_weight]}>What People are saying</Text>

              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15 }}>
                    <Text style={[common_styles.extra_large_text_normal_weight, { fontSize: 35 }]}>4.5</Text>
                    <View>
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'center',
                      }}>
                        {[...Array(5)].map((_, i) => (
                          <MaterialIcons
                            key={i}
                            name="star"
                            size={20}
                            color="#FFD700"
                            style={styles.star}
                          />
                        ))}
                      </View>
                      <Text style={[common_styles.small_text_normal_weight, { color: 'gray' }]}>200 reviews</Text>
                    </View>
                  </View>
                  <BigButton
                    label={"Add review"}
                    labelStyle={{ color: 'white' }}
                    style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 25, paddingInline: 15 }}
                    IconCategory={MaterialIcons}
                    iconSize={20}
                    iconColor={'white'}
                    iconName={'add'}
                  />
                </View>

                {[...Array(5)].map((item, index) => (
                  <ReviewProgress key={index} index={index} />
                ))}

                <View style={{ marginTop: 15 }}>
                  <Text style={[common_styles.medium_text_normal_weight, { color: colorTheme.primaryColor, textAlign: 'right', }]}>{"View all reviews >"}</Text>

                  <FullCarousel
                    Component={ReviewCard}
                    data={docData?.data?.reviews}
                    autoPlay={true}
                    fastInterval={1500}
                    loop={true}
                    componentWidth={30}
                    dynamicHeight={0.66}
                    dotCenter
                  // onSnapToItem={(index) => console.log('Snapped to item:', index)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showAvailabilitySheet && (
        <AvailabilityBottomSheet
          timeSlots={timeSlots}
          isWorkingDay={isWorkingDay}
          selectedDate={selectedDate}
          handleClose={() => setShowAvailabilitySheet(false)}
        />
      )}
      <BigButton
        label={"Book Appointment >"}
        labelStyle={{ color: 'white' }}
        onPress={()=>navigation.navigate('AppointmentDetail')}
        style={[styles.subContainer, { backgroundColor: colorTheme.primaryColor, position: 'absolute', bottom: 10, borderRadius: 25 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BottomContainer: {
    width: '90%',
    alignSelf: 'center',
    // flex:1
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  dayColumn: {
    width: 35,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dateContainer: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateContainer: {
    backgroundColor: colorTheme.primaryColor,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  selectedDateText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timeSlotsContainer: {
    width: '100%',
    marginTop: 20,
  },
  timeSlot: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  viewAllButton: {
    alignSelf: 'center',
    marginTop: 15,
  },
  viewAllText: {
    color: colorTheme.primaryColor,
    fontSize: 14,
    fontWeight: '500',
  },
  cell: {
    width: '23%', // less than 25% to leave room for spacing
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colorTheme.iconBg,
    borderRadius: 8,
    marginBottom: 10, // vertical spacing
    borderColor: colorTheme.primaryColor,
    borderWidth: 1
  },
  disabledDate: {
    backgroundColor: '#f0f0f0',
  },
  disabledDateText: {
    color: '#ccc',
  },
  availableCell: {
    backgroundColor: colorTheme.primaryColor + '20',
    borderColor: colorTheme.primaryColor,
  },
  availabilitySheetContainer: {
    padding: 20,
    width: '90%',
    alignSelf: 'center'
  },
  availabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10
  },
  availabilityCell: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorTheme.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  bookedCell: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  bookedText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  bookedLabel: {
    color: 'red',
    fontSize: 10,
    marginTop: 2,
  },
  disabledDate: {
    backgroundColor: '#f8f8f8',
    borderColor: '#e0e0e0',
  },
  disabledDateText: {
    color: '#aaa',
  },
});

export default Details;