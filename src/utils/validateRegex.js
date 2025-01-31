export function truncateText(text, maxLength) {
    // Check if the length of the text is greater than the provided maxLength
    if (text.length > maxLength) {
        // Truncate the text to maxLength and append '...'
        return text.substring(0, maxLength) + '...';
    } else {
        // If the text is within the limit, return it as is
        return text;
    }
}

export const validateEmail = (email) => {
    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return 'Please enter a valid email address.';
    }
    return '';
};

export const validatePassword = (value) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/`~\-]).{8,}$/.test(value)) {
        return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
    }
    return '';
};