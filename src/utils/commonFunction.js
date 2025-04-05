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
