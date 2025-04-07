import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BigButton from '../Buttons/BigButton';
import { colorTheme } from '../../constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const DateTimeInput = ({ mode = 'date', onChangeValue, disabled = false,title }) => {
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
                label={date !== "" ? (mode=='date'? new Date(date).toISOString().split("T")[0] :new Date(date).toTimeString().split(" GMT")[0]): `Pick ${mode}`}
                onPress={() => {
                    if (!disabled) setShow(true); // Only show picker if not disabled
                }}
                style={{ borderWidth: 1, borderColor: colorTheme.borderColor, backgroundColor: disabled ? colorTheme.borderColor : 'transparent', }}
                IconCategory={MaterialCommunityIcons}
                iconColor={disabled ? colorTheme.iconLightBackGroundColor : colorTheme.primaryColor}
                iconSize={20}
                iconName={mode==='date'?'calendar-month':'clock'}
            // disabled={disabled}
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