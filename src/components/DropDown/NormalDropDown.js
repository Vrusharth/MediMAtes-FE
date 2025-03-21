import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colorTheme, common_styles } from '../../constant';

// Debounce function to delay validation
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

const NormalDropDown = ({ placeholder, data, setFormValues, name, value, validationFunc, onChange, isInputArray, disabled = false, }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [error, setError] = useState('');
    const [typingStarted, setTypingStarted] = useState(false);

    // Debounced validation function
    const debouncedValidation = debounce((selectedValue) => {
        if (validationFunc) {
            const validationError = validationFunc(selectedValue);
            setError(validationError || '');
        }
    }, 1000); // 1-second delay after selection

    useEffect(() => {
        if (typingStarted) {
            debouncedValidation(value);
        }
    }, [value]);

    const handleChange = (item) => {
        if (disabled) return; // Do nothing if disabled
        setTypingStarted(true); // User started interacting

        // If a custom onChange function is provided, call it and skip the internal logic
        if (onChange) {
            onChange(item);
            return; // Exit early to avoid running the internal logic
        }

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: item.value,
        }));
        if (validationFunc) {
            const validationError = validationFunc(item.value);
            setError(validationError || '');
        }
    };

    const handleBlur = () => {
        if (disabled) return; // Do nothing if disabled
        setTypingStarted(false); // Reset typing state
        if (validationFunc) {
            const validationError = validationFunc(value);
            setError(validationError || '');
        }
    };

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, common_styles.small_text_normal_weight, disabled && styles.disabledLabel]}>
                    {(value.length !== 0 ? value[value.length - 1] : placeholder)}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {isInputArray && renderLabel()}
            <Dropdown
                style={[styles.dropdown, { borderColor: error === '' ? colorTheme.borderColor : 'red' }, disabled && styles.disabledDropdown,]}
                placeholderStyle={[styles.placeholderStyle, disabled && styles.disabledPlaceholder]}
                selectedTextStyle={[styles.selectedTextStyle, disabled && styles.disabledText]}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                autoScroll
                search
                maxHeight={300}
                minHeight={100}
                labelField="label"
                valueField="value"
                searchField="search"
                placeholder={!isFocus ? "Select" : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => {
                    if (!disabled) setIsFocus(true); // Only focus if not disabled
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                disable={disabled} 
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

export default NormalDropDown;

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
    },
    dropdown: {
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 15,
    },
    label: {
        position: 'absolute',
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        backgroundColor: 'white', // Add background color to avoid overlapping with the dropdown
        top: -10, // Adjust the position to align with the dropdown
        left: 10,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 5,
    },
    disabledDropdown: {
        backgroundColor: colorTheme.borderColor, // Light gray background for disabled state
        borderColor: 'black', // Light gray border for disabled state
    },
    disabledPlaceholder: {
        color: '#a9a9a9', // Gray placeholder text for disabled state
    },
    disabledText: {
        color: '#a9a9a9', // Gray selected text for disabled state
    },
    disabledLabel: {
        color: '#a9a9a9', // Gray label text for disabled state
    },
});