import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BigButton from '../Buttons/BigButton';
import { colorTheme } from '../../constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const DateTimeInput = ({ mode = 'date', onChangeValue }) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState("");

    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
            if (onChangeValue) onChangeValue(selectedDate);
        }
    };

    return (
        <View>
            <BigButton
                label={date !== "" ? new Date(date).toISOString().split("T")[0] : `Pick ${mode}`}
                onPress={() => setShow(true)}
                style={{ borderWidth: 1, borderColor: colorTheme.borderColor }}
                IconCategory={MaterialCommunityIcons}
                iconColor={colorTheme.primaryColor}
                iconSize={20}
                iconName={'calendar-month'}
            />
            {show && (
                <DateTimePicker
                    value={new Date()}
                    mode={mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default DateTimeInput;