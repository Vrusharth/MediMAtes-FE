import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetHandle } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorTheme, common_styles } from '../../../constant';
import Status from '../../../components/Status';
import Header from '../../../components/Header';
import IconButton from '../../../components/Buttons/IconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Define handleSheetChanges function
  const handleSheetChanges = useCallback((index) => {
    console.log('Bottom sheet index changed to:', index);
  }, []);

  // Define renderHandle function
  const renderHandle = useCallback((props) => (
    <BottomSheetHandle {...props} />
  ), []);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    for (let i = 0; i < startDay; i++) {
      days.push(<Text key={`empty-${i}`} style={styles.dayText}></Text>);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <TouchableOpacity key={`day-${i}`} onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i))}>
          <Text style={[styles.dayText, selectedDate.getDate() === i && styles.selectedDayText]}>{i}</Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  return (
    <View style={styles.container}>
      <Status />
      <View style={{ height: '50%' }}>
        <Header rightIcon={'share-variant-outline'} />
        <View style={[styles.subContainer]}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ width: '45%', alignSelf: 'center' }}>
              <IconButton style={{ width: '50%' }} IconCategory={Ionicons} color={colorTheme.secondaryColor} iconName={'star'} size={20} label={'4.5'} />
              <Text style={[common_styles.extra_large_text_large_weight, { fontSize: 27 }]}>Dr. Mohak Singh</Text>
              <Text style={[common_styles.medium_text_normal_weight, {}]}>Cardiology</Text>
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
        onChange={handleSheetChanges}
        handleComponent={renderHandle} // Use the custom handle
        index={0}
      >
        <BottomSheetView style={[styles.BottomContainer, { alignItems: 'flex-start' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={[common_styles.medium_text_normal_weight]}>Select Date</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => handleMonthChange(-1)}>
                <MaterialIcons name={"keyboard-arrow-left"} size={25} color={'black'} />
              </TouchableOpacity>
              <Text style={[common_styles.medium_text_normal_weight]}>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</Text>
              <TouchableOpacity onPress={() => handleMonthChange(1)}>
                <MaterialIcons name={"keyboard-arrow-right"} size={25} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.daysContainer}>
            {renderDays()}
          </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BottomContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  dayText: {
    // width: 2,
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    color:'black'
  },
  selectedDayText: {
    backgroundColor: colorTheme.primaryColor,
    color: 'black',
    borderRadius: 50,
  },
});

export default App;