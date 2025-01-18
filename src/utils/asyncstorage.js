// Import AsyncStorage from React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

// Utility for setting data
export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value); // Convert value to JSON string
    await AsyncStorage.setItem(key, jsonValue); // Save the item
    return true;
  } catch (error) {
    console.error(`Error setting item for key ${key}:`, error);
    return false;
  }
};

// Utility for getting data
export const getItem = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key); // Retrieve the item
    return jsonValue != null ? JSON.parse(jsonValue) : null; // Parse and return
  } catch (error) {
    console.error(`Error getting item for key ${key}:`, error);
    return null;
  }
};

// Utility for removing data
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key); // Remove the item
    console.log(`Data removed for key: ${key}`);
    return true;
  } catch (error) {
    console.error(`Error removing item for key ${key}:`, error);
    return false;
  }
};