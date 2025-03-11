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

export const validateEmtyInput = (str) => {
    if (!/^\s*$/.test(str)) {
        return '';
    }
    return 'Field cannot be empty.';
};

export const validatePassword = (value) => {
    const errors = [];

    if (value.length < 8) {
        errors.push("• At least 8 characters long");
    }
    if (!/[a-z]/.test(value)) {
        errors.push("• At least one lowercase letter");
    }
    if (!/[A-Z]/.test(value)) {
        errors.push("• At least one uppercase letter");
    }
    if (!/\d/.test(value)) {
        errors.push("• At least one number");
    }
    if (!/[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/`~\-]/.test(value)) {
        errors.push("• At least one special character");
    }

    return errors.length > 0 ? errors.join("\n") : "";
};
