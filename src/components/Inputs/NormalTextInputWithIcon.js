import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorTheme } from '../../constant';

// Debounce function to delay validation
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

export default function NormalTextInputWithIcon({
    placeholder,
    inputMode,
    style,
    icon,
    secureTextEntry,
    textInputStyle,
    divider,
    onChangeFunc,
    setFormValues,
    name,
    value,
    validationFunc,
    disabled = false,
    rightIcon,
    enterKeyHint,
    submitEdit
}) {
    const [secureText, setSecureText] = useState(secureTextEntry);
    const [error, setError] = useState('');
    const [typingStarted, setTypingStarted] = useState(false);

    // Debounced validation function
    const debouncedValidation = debounce((text) => {
        if (validationFunc) {
            const validationError = validationFunc(text);
            setError(validationError || '');
        }
    }, 1000); // 1-second delay after typing stops

    useEffect(() => {
        if (typingStarted) {
            debouncedValidation(value);
        }
    }, [value]);

    function onSubmitEdit() {
        if (submitEdit) {
            submitEdit();
            return;
        }
    }

    const handleChange = (text) => {
        if (disabled) return; // Do nothing if disabled
        if (onChangeFunc) {
            onChangeFunc(text);
            return;
        }
        setTypingStarted(true); // User started typing
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: text,
        }));
    };

    const handleBlur = () => {
        if (disabled) return; // Do nothing if disabled
        setTypingStarted(false); // Reset typing state
        if (validationFunc) {
            const validationError = validationFunc(value);
            setError(validationError || '');
        }
    };

    return (
        <>
            <View style={[styles.viewStyle, style, { borderColor: error === '' ? colorTheme.borderColor : 'red' }, disabled && styles.disabledView,]}>
                {icon && (
                    <MaterialCommunityIcons
                        name={icon}
                        size={25}
                        color={disabled ? '#a9a9a9' : colorTheme.textColor}
                    />
                )}
                {divider && <View style={styles.divider} />}
                <TextInput
                    placeholder={placeholder || ''}
                    inputMode={inputMode || 'text'}
                    style={[styles.textInput, textInputStyle, disabled && styles.disabledTextInput,]}
                    value={value}
                    onChangeText={handleChange}
                    secureTextEntry={secureText}
                    onBlur={handleBlur}
                    editable={!disabled} // Disable TextInput if disabled is true
                    selectTextOnFocus={!disabled} // Prevent text selection if disabled
                    enterKeyHint={enterKeyHint || 'done'}
                    onSubmitEditing={onSubmitEdit}
                />
                {secureTextEntry && (
                    <MaterialCommunityIcons
                        name={secureText ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color={disabled ? '#a9a9a9' : colorTheme.textColor}
                        onPress={disabled ? null : () => setSecureText((prev) => !prev)} // Disable icon press if disabled
                    />
                )}
                {rightIcon && (
                    <MaterialCommunityIcons
                        name={rightIcon}
                        size={25}
                        color={disabled ? '#a9a9a9' : colorTheme.textColor}
                    />
                )}
            </View>
            {!disabled && error ? <Text style={styles.errorText}>{error}</Text> : null}
        </>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        width: '100%'
    },
    divider: {
        width: 1,
        borderWidth: 0.5,
        height: '100%',
        marginLeft: 10,
    },
    textInput: {
        flex: 1
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 5,
    },
    disabledView: {
        backgroundColor: colorTheme.borderColor, // Background color for disabled state
        borderColor: "gray", // Border color for disabled state
    },
    disabledTextInput: {
        color: colorTheme.textColor, // Text color for disabled state
    },
});
