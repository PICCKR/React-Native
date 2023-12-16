import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalData = async (storageKey, value) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(value));
  } catch (e) {
  }
};

export const getLocalData = async storageKey => {
  try {
    value = await AsyncStorage.getItem(storageKey);
    if (value !== null) {
      let data = JSON.parse(value);
      return data;
    }
  } catch (e) {
  }
};

// clear data
export const clearLocalData = async () => {
  try {
    const res = await AsyncStorage.clear();
    // console.log('clear res', res);
    return res
  } catch (e) {

  }
};
