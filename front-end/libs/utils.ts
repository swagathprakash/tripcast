import AsyncStorage from "@react-native-async-storage/async-storage";

const mobileNumberRegex = /^\d{10}$/;

const validateMobileNumber = (mobileNumber: string) => {
  return mobileNumber.match(mobileNumberRegex);
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("phone");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem("phone", value);
  } catch (e) {
    // saving error
  }
};

export { validateMobileNumber, getData, storeData };
